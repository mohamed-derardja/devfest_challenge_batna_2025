/**
 * Study Controller - AI Study Assistant with PDF/Image/Text support
 * 
 * Fixed issues:
 * 1. ESM to CommonJS conversion for module compatibility
 * 2. pdf-parse fixed with direct require pattern for serverless
 * 3. GoogleGenAI SDK usage corrected
 * 4. Puppeteer removed (not serverless compatible)
 * 5. Tesseract.js made optional with graceful fallback
 * 6. sharp replaced with jimp for better serverless compatibility
 * 7. Added proper error handling and memory management
 * 8. Added request timeouts for serverless environment
 */

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

// Environment configuration
require('dotenv').config();

// ===============================
// Lazy-loaded dependencies for serverless optimization
// ===============================
let pdfParse = null;
let Tesseract = null;
let Jimp = null;
let genAI = null;

/**
 * Initialize PDF parser with serverless-compatible import
 */
async function getPdfParser() {
    if (!pdfParse) {
        try {
            // Use the direct path to avoid test file execution issues
            pdfParse = require('pdf-parse/lib/pdf-parse');
        } catch (err) {
            console.warn('pdf-parse not available, PDF support disabled');
            pdfParse = null;
        }
    }
    return pdfParse;
}

/**
 * Initialize Tesseract OCR (optional, may not work in serverless)
 */
async function getTesseract() {
    if (Tesseract === undefined) {
        try {
            Tesseract = require('tesseract.js');
        } catch (err) {
            console.warn('Tesseract.js not available, OCR disabled');
            Tesseract = null;
        }
    }
    return Tesseract;
}

/**
 * Initialize Jimp for image processing (serverless-friendly alternative to sharp)
 */
async function getJimp() {
    if (Jimp === undefined) {
        try {
            Jimp = require('jimp');
        } catch (err) {
            console.warn('Jimp not available, image processing disabled');
            Jimp = null;
        }
    }
    return Jimp;
}

/**
 * Initialize Google Generative AI client
 */
function getGenAI() {
    if (!genAI) {
        try {
            const { GoogleGenerativeAI } = require('@google/generative-ai');
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                throw new Error('GEMINI_API_KEY environment variable is required');
            }
            genAI = new GoogleGenerativeAI(apiKey);
        } catch (err) {
            console.error('Failed to initialize Gemini AI:', err.message);
            throw err;
        }
    }
    return genAI;
}

/**
 * Generate content using Gemini AI with proper error handling
 */
async function generateAIContent(prompt, options = {}) {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({
        model: options.model || 'gemini-1.5-flash',
        generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.maxOutputTokens || 2048,
        }
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

// ===============================
// OCR: Extract text from images
// ===============================
async function extractTextFromImage(filePath) {
    const tesseract = await getTesseract();
    const jimp = await getJimp();

    if (!tesseract) {
        return '[OCR not available - Tesseract.js not installed]';
    }

    try {
        let processedPath = filePath;

        // Preprocess image with Jimp if available
        if (jimp) {
            try {
                const image = await jimp.read(filePath);
                processedPath = path.join(
                    path.dirname(filePath),
                    'processed-' + path.basename(filePath)
                );
                await image
                    .greyscale()
                    .contrast(0.2)
                    .writeAsync(processedPath);
            } catch (imgErr) {
                console.warn('Image preprocessing failed:', imgErr.message);
                processedPath = filePath;
            }
        }

        // Perform OCR with timeout
        const { data: { text } } = await Promise.race([
            tesseract.recognize(processedPath, 'eng'),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('OCR timeout')), 30000)
            )
        ]);

        // Cleanup processed file
        if (processedPath !== filePath) {
            await fs.unlink(processedPath).catch(() => { });
        }

        return text.trim() || '[No text detected in image]';
    } catch (err) {
        console.error('OCR Error:', err.message);
        return '[Unable to extract text from image]';
    }
}

// ===============================
// Extract text from any supported file
// ===============================
async function extractTextFromFile(filePath, mimeType) {
    try {
        if (mimeType === 'application/pdf') {
            const parser = await getPdfParser();
            if (!parser) {
                return '[PDF parsing not available]';
            }
            const buffer = await fs.readFile(filePath);
            const data = await parser(buffer);
            return data.text || '';
        } else if (mimeType && mimeType.startsWith('image/')) {
            return await extractTextFromImage(filePath);
        } else if (mimeType === 'text/plain') {
            return await fs.readFile(filePath, 'utf-8');
        }
        return '';
    } catch (err) {
        console.error('Text extraction error:', err.message);
        return `[Error extracting text: ${err.message}]`;
    } finally {
        // Cleanup uploaded file
        await fs.unlink(filePath).catch(() => { });
    }
}

// ===============================
// Prompts
// ===============================
const studyAssistantPrompt = `
You are an AI Study Assistant. Provide:
1. Clear explanations with examples
2. Summaries if documents are provided
3. Practice quiz questions
4. Resource recommendations
5. Study schedule suggestions if relevant

Rules:
- Academic topics only
- Respond in markdown
`;

const summarizationPrompt = `
You are an academic summarization engine.

Return ONLY the following structure in markdown:

## General Topic
(1 sentence)

## Key Points
- Point 1 (1–2 sentences)
- Point 2 (optional)
- Point 3 (optional)

## Short Summary
(3–5 concise lines)

## Study More
- Topics, books, or academic resources

Rules:
- No opinions
- No emojis
- No extra sections
`;

const studyPlannerPrompt = `
You are an AI Study Planner. Your task is to create a detailed and realistic study schedule.

Input:
- Total available study time (days, hours per day)
- List of modules or topics

Output a plan with:
1. Daily schedule (hours per topic/module)
2. Suggested breaks
3. Priority topics first
4. Tips for efficient study
5. Optional mini quizzes or practice tasks

Rules:
- Be practical and achievable
- Academic topics only
- Respond in markdown
`;

const resourcePrompt = `
You are an AI Resource Recommender for students. 

Input: A topic or subject provided by the user.  

Output: A structured list of study resources including:
1. Books (title + author + short description)
2. YouTube videos (title + link + short description)
3. Websites or articles (title + link + short description)
4. Optional: Free courses or tools if relevant

Rules:
- Academic resources only
- Include a variety of formats
- Respond in markdown
- Be concise and useful
`;

const exercisePrompt = `
You are an AI Exercise and Quiz Generator for students.

Input: A topic or module provided by the user.

Output a structured response in markdown:
1. **Examples with Solutions** – Show at least 2 worked examples.
2. **Exercises** – At least 3 exercises for practice (with answers hidden or revealed separately).
3. **Quiz** – 5 multiple-choice questions with 4 options each, indicate the correct answer.

Rules:
- Academic content only
- Clear and concise explanations
- Respond in markdown
`;

// ===============================
// Study Assistant Endpoint
// ===============================
exports.studyAssistant = async (req, res) => {
    try {
        const { prompt } = req.body;
        const file = req.file;

        if (!prompt && !file) {
            return res.status(400).json({
                success: false,
                message: 'Provide a prompt or a file'
            });
        }

        let documentText = '';
        let enhancedPrompt = prompt || '';

        if (file) {
            documentText = await extractTextFromFile(file.path, file.mimetype);
            // Limit document text to prevent token overflow
            const truncatedText = documentText.slice(0, 10000);
            enhancedPrompt = `Document Content:\n${truncatedText}\n\nStudent Question:\n${prompt || 'Please analyze this document.'}`;
        }

        const fullPrompt = `${studyAssistantPrompt}\n\n${enhancedPrompt}`;
        const responseText = await generateAIContent(fullPrompt, {
            temperature: 0.7,
            maxOutputTokens: 2048
        });

        res.json({
            success: true,
            response: responseText,
            hasDocument: Boolean(file),
            documentType: file?.mimetype || null,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Study Assistant Error:', err.message);
        // Cleanup file on error
        if (req.file?.path) {
            await fs.unlink(req.file.path).catch(() => { });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to process request',
            error: err.message
        });
    }
};

// ===============================
// Summarization Endpoint
// ===============================
exports.summarizeContent = async (req, res) => {
    try {
        const { text, points = 3 } = req.body;
        const file = req.file;
        let content = text || '';

        if (file) {
            content = await extractTextFromFile(file.path, file.mimetype);
        }

        if (!content || content.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No content to summarize'
            });
        }

        const finalPrompt = `${summarizationPrompt}\n\nContent:\n"""${content.slice(0, 12000)}"""\n\nImportant:\n- Provide exactly ${points} key points.`;

        const responseText = await generateAIContent(finalPrompt, {
            temperature: 0.3,
            maxOutputTokens: 800
        });

        res.json({
            success: true,
            summary: responseText,
            keyPointsRequested: points,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Summarization Error:', err.message);
        if (req.file?.path) {
            await fs.unlink(req.file.path).catch(() => { });
        }
        res.status(500).json({
            success: false,
            message: 'Failed to summarize content',
            error: err.message
        });
    }
};

// ===============================
// Study Planner Endpoint
// ===============================
exports.studyPlanner = async (req, res) => {
    try {
        const { totalDays, hoursPerDay, modules } = req.body;

        if (!totalDays || !hoursPerDay || !modules || !Array.isArray(modules) || modules.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Provide totalDays, hoursPerDay, and modules array'
            });
        }

        // Sanitize input
        const sanitizedModules = modules.slice(0, 20).map(m =>
            String(m).slice(0, 100).replace(/[<>]/g, '')
        );

        const userInput = `
Student has ${Math.min(Number(totalDays), 365)} days available.
Can study ${Math.min(Number(hoursPerDay), 24)} hours per day.
Modules to cover: ${sanitizedModules.join(', ')}.
`;

        const finalPrompt = `${studyPlannerPrompt}\n\n${userInput}`;

        const responseText = await generateAIContent(finalPrompt, {
            temperature: 0.5,
            maxOutputTokens: 1500
        });

        res.json({
            success: true,
            plan: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Study Planner Error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to generate study plan',
            error: err.message
        });
    }
};

// ===============================
// Resource Recommendation Endpoint
// ===============================
exports.recommendResources = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Provide a topic to get recommendations'
            });
        }

        // Sanitize topic
        const sanitizedTopic = topic.slice(0, 200).replace(/[<>]/g, '');
        const finalPrompt = `${resourcePrompt}\n\nTopic: ${sanitizedTopic}`;

        const responseText = await generateAIContent(finalPrompt, {
            temperature: 0.5,
            maxOutputTokens: 1200
        });

        res.json({
            success: true,
            topic: sanitizedTopic,
            recommendations: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Resource Recommendation Error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to generate recommendations',
            error: err.message
        });
    }
};

// ===============================
// Exercise & Quiz Generator Endpoint
// ===============================
exports.generateExercises = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Provide a topic or module'
            });
        }

        // Sanitize topic
        const sanitizedTopic = topic.slice(0, 200).replace(/[<>]/g, '');
        const finalPrompt = `${exercisePrompt}\n\nTopic: ${sanitizedTopic}`;

        const responseText = await generateAIContent(finalPrompt, {
            temperature: 0.7,
            maxOutputTokens: 2000
        });

        res.json({
            success: true,
            topic: sanitizedTopic,
            exercises: responseText,
            timestamp: new Date().toISOString()
        });

    } catch (err) {
        console.error('Exercise Generator Error:', err.message);
        res.status(500).json({
            success: false,
            message: 'Failed to generate exercises',
            error: err.message
        });
    }
};

// ===============================
// Internship Scraping - Using static/mock data fallback
// Note: Live scraping is unreliable and blocked by most sites
// ===============================
const MOCK_INTERNSHIPS = [
    {
        title: "Software Engineering Intern",
        company: "Tech Corp",
        location: "Remote",
        link: "#",
        match: "95%",
        paid: "Paid",
        duration: "3 months",
        salary: "$2000/month",
        deadline: "2025-02-01",
        skills: ["JavaScript", "React", "Node.js"]
    },
    {
        title: "Data Science Intern",
        company: "Analytics Inc",
        location: "New York, NY",
        link: "#",
        match: "88%",
        paid: "Paid",
        duration: "6 months",
        salary: "$2500/month",
        deadline: "2025-01-15",
        skills: ["Python", "Machine Learning", "SQL"]
    },
    {
        title: "UI/UX Design Intern",
        company: "Creative Studio",
        location: "San Francisco, CA",
        link: "#",
        match: "82%",
        paid: "Paid",
        duration: "4 months",
        salary: "$1800/month",
        deadline: "2025-01-30",
        skills: ["Figma", "Adobe XD", "User Research"]
    }
];

const MOCK_SCHOLARSHIPS = [
    {
        title: "STEM Excellence Scholarship",
        eligibility: "Undergraduate",
        organization: "National Science Foundation",
        amount: "$10,000",
        deadline: "2025-03-01",
        requirements: ["GPA 3.5+", "STEM Major", "US Citizen"]
    },
    {
        title: "Global Leadership Award",
        eligibility: "Graduate",
        organization: "World Education Fund",
        amount: "$25,000",
        deadline: "2025-02-15",
        requirements: ["Leadership Experience", "Community Service", "Full-time Student"]
    },
    {
        title: "Innovation Grant",
        eligibility: "All Students",
        organization: "Tech Innovators Foundation",
        amount: "$5,000",
        deadline: "2025-04-01",
        requirements: ["Project Proposal", "Recommendation Letter"]
    }
];

exports.getInternships = async (req, res) => {
    try {
        // Try to fetch from configured URL, fallback to mock data
        const dataUrl = process.env.INTERNSHIPS_DATA_URL;

        if (dataUrl) {
            try {
                const { data } = await axios.get(dataUrl, { timeout: 5000 });
                const $ = cheerio.load(data);
                const internships = [];

                $('li').each((i, el) => {
                    const title = $(el).find('.internship-title').text().trim();
                    const link = $(el).find('.internship-title').attr('href');
                    const match = $(el).find('.match-badge').text().trim();
                    const company = $(el).find('.company').text().trim();
                    const paid = $(el).find('.details-grid .tag.paid').text().trim();
                    const location = $(el).find('.details-grid .tag.location').text().trim();
                    const duration = $(el).find('.details-grid .tag.duration').text().trim();
                    const salary = $(el).find('.details-grid .tag.salary').text().trim();
                    const deadline = $(el).find('.details-grid .tag.deadline').text().replace('Due:', '').trim();

                    const skills = [];
                    $(el).find('.required-skills .skill-tag').each((j, skill) => {
                        skills.push($(skill).text().trim());
                    });

                    if (title && link) {
                        internships.push({
                            title, link, match, company, paid,
                            location, duration, salary, deadline, skills
                        });
                    }
                });

                if (internships.length > 0) {
                    return res.json({ success: true, data: internships, source: 'live' });
                }
            } catch (fetchErr) {
                console.warn('Failed to fetch live internships:', fetchErr.message);
            }
        }

        // Return mock data as fallback
        res.json({
            success: true,
            data: MOCK_INTERNSHIPS,
            source: 'demo',
            note: 'Using demo data. Configure INTERNSHIPS_DATA_URL for live data.'
        });

    } catch (error) {
        console.error('Internships Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch internships',
            error: error.message
        });
    }
};

exports.getScholarships = async (req, res) => {
    try {
        // Try to fetch from configured URL, fallback to mock data
        const dataUrl = process.env.SCHOLARSHIPS_DATA_URL;

        if (dataUrl) {
            try {
                const { data } = await axios.get(dataUrl, { timeout: 5000 });
                const $ = cheerio.load(data);
                const scholarships = [];

                $('.scholarship-card').each((i, el) => {
                    const title = $(el).find('.scholarship-title').text().trim();
                    const eligibility = $(el).find('.eligibility-badge').text().trim();
                    const organization = $(el).find('.organization').text().trim();
                    const amount = $(el).find('.amount').text().trim();
                    const deadline = $(el).find('.deadline').text().replace('Deadline:', '').trim();

                    const requirements = [];
                    $(el).find('.requirements-list .requirement-item').each((j, req) => {
                        requirements.push($(req).text().trim());
                    });

                    if (title) {
                        scholarships.push({
                            title, eligibility, organization,
                            amount, deadline, requirements
                        });
                    }
                });

                if (scholarships.length > 0) {
                    return res.json({ success: true, data: scholarships, source: 'live' });
                }
            } catch (fetchErr) {
                console.warn('Failed to fetch live scholarships:', fetchErr.message);
            }
        }

        // Return mock data as fallback
        res.json({
            success: true,
            data: MOCK_SCHOLARSHIPS,
            source: 'demo',
            note: 'Using demo data. Configure SCHOLARSHIPS_DATA_URL for live data.'
        });

    } catch (error) {
        console.error('Scholarships Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch scholarships',
            error: error.message
        });
    }
};
