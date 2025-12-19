import fs from 'fs/promises';
import path from 'path';
import * as pdfParse from 'pdf-parse';
import { GoogleGenAI } from '@google/genai';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import * as cheerio from 'cheerio';
import axios from 'axios';
import puppeteer from 'puppeteer';
import 'dotenv/config';



// ===============================
// Initialize Google GenAI client
// ===============================
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ===============================
// OCR: Extract text from images
// ===============================
async function describeImage(filePath) {
  try {
    const processedPath = path.join(path.dirname(filePath), 'processed-' + path.basename(filePath));
    await sharp(filePath).grayscale().normalize().toFile(processedPath);

    const { data: { text } } = await Tesseract.recognize(processedPath, 'eng');

    await fs.unlink(processedPath).catch(() => {});
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
      const buffer = await fs.readFile(filePath);
      const data = await pdfParse(buffer);
      return data.text;
    } else if (mimeType.startsWith('image/')) {
      return await describeImage(filePath);
    } else if (mimeType === 'text/plain') {
      return await fs.readFile(filePath, 'utf-8');
    }
    return '';
  } catch (err) {
    console.error('Text extraction error:', err.message);
    return '';
  } finally {
    await fs.unlink(filePath).catch(() => {});
  }
}

// ===============================
// Study Assistant Endpoint
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

export const studyAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;
    const file = req.file;

    if (!prompt && !file) {
      return res.status(400).json({ success: false, message: 'Provide a prompt or a file' });
    }

    let documentText = '';
    let enhancedPrompt = prompt || '';

    if (file) {
      documentText = await extractTextFromFile(file.path, file.mimetype);
      enhancedPrompt = `Document Content:\n${documentText.slice(0, 10000)}\n\nStudent Question:\n${prompt || ''}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${studyAssistantPrompt}\n\n${enhancedPrompt}`,
      temperature: 0.7,
      maxOutputTokens: 2048
    });

    res.json({
      success: true,
      response: response.text,
      hasDocument: Boolean(file),
      documentType: file?.mimetype || null,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Study Assistant Error:', err.message);
    if (req.file?.path) await fs.unlink(req.file.path).catch(() => {});
    res.status(500).json({ success: false, message: 'Failed to process request', error: err.message });
  }
};

// ===============================
// Summarization Endpoint
// ===============================
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

export const summarizeContent = async (req, res) => {
  try {
    const { text, points = 3 } = req.body;
    const file = req.file;
    let content = text || '';

    if (file) content = await extractTextFromFile(file.path, file.mimetype);

    const finalPrompt = `${summarizationPrompt}\n\nContent:\n"""${content.slice(0, 12000)}"""\n\nImportant:\n- Provide exactly ${points} key points.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      temperature: 0.3,
      maxOutputTokens: 800
    });

    res.json({ success: true, summary: response.text, keyPointsRequested: points, timestamp: new Date().toISOString() });

  } catch (err) {
    console.error('Summarization Error:', err.message);
    if (req.file?.path) await fs.unlink(req.file.path).catch(() => {});
    res.status(500).json({ success: false, message: 'Failed to summarize content', error: err.message });
  }
};

// ===============================
// Study Planner Endpoint
// ===============================
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

export const studyPlanner = async (req, res) => {
  try {
    const { totalDays, hoursPerDay, modules } = req.body;

    if (!totalDays || !hoursPerDay || !modules || !Array.isArray(modules) || modules.length === 0) {
      return res.status(400).json({ success: false, message: 'Provide totalDays, hoursPerDay, and modules array' });
    }

    const userInput = `
Student has ${totalDays} days available.
Can study ${hoursPerDay} hours per day.
Modules to cover: ${modules.join(', ')}.
`;

    const finalPrompt = `${studyPlannerPrompt}\n\n${userInput}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      temperature: 0.5,
      maxOutputTokens: 1500
    });

    res.json({
      success: true,
      plan: response.text,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    console.error('Study Planner Error:', err.message);
    res.status(500).json({ success: false, message: 'Failed to generate study plan', error: err.message });
  }
};



// ===============================
// Internship Scraping Endpoint
// ===============================

const LOCAL_HTML_URL = 'http://127.0.0.1:5500/landing-sc/index.html';

export const getInternships = async (req, res) => {
  try {
    const { data } = await axios.get(LOCAL_HTML_URL);
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
      const deadline = $(el).find('.details-grid .tag.deadline').text().replace('Due:','').trim();

      const skills = [];
      $(el).find('.required-skills .skill-tag').each((j, skill) => {
        skills.push($(skill).text().trim());
      });

      if(title && link) {
        internships.push({
          title,
          link,
          match,
          company,
          paid,
          location,
          duration,
          salary,
          deadline,
          skills
        });
      }
    });

    res.json({ success: true, data: internships });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to scrape internships', error: error.message });
  }
};



// export const fetchInternships = async (req, res) => {
//   try {
//     const results = [];
//     const query = req.query.q || 'internship';
//     const location = req.query.location || '';

//     // -------------------------
//     // 1. Indeed
//     // -------------------------
//     try {
//       let url = `https://www.indeed.com/jobs?q=${encodeURIComponent(query)}`;
//       if (location) url += `&l=${encodeURIComponent(location)}`;

//       const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
//       const $ = cheerio.load(data);

//       $('.result').each((i, el) => {
//         const title = $(el).find('.jobTitle').text().trim();
//         const company = $(el).find('.companyName').text().trim();
//         const loc = $(el).find('.companyLocation').text().trim();
//         const link = 'https://www.indeed.com' + $(el).find('a').attr('href');

//         if (title) results.push({ title, company, location: loc, link, source: 'Indeed' });
//       });
//     } catch (err) {
//       console.error('Indeed scraping failed:', err.message);
//     }

//     // -------------------------
//     // 2. Emploitic
//     // -------------------------
//     try {
//       const { data } = await axios.get('https://www.emploitic.com/emploi-recherche?q=stage', { headers: { 'User-Agent': 'Mozilla/5.0' } });
//       const $ = cheerio.load(data);

//       $('.job-listing').each((i, el) => {
//         const title = $(el).find('.title-job').text().trim();
//         const company = $(el).find('.company-name').text().trim();
//         const loc = $(el).find('.location-job').text().trim();
//         const link = 'https://www.emploitic.com' + $(el).find('a').attr('href');

//         if (title) results.push({ title, company, location: loc, link, source: 'Emploitic' });
//       });
//     } catch (err) {
//       console.error('Emploitic scraping failed:', err.message);
//     }

//     // -------------------------
//     // 3. LinkedIn (dynamic Puppeteer)
//     // -------------------------
//     try {
//       const browser = await puppeteer.launch({ headless: true });
//       const page = await browser.newPage();
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

//       const linkedinUrl = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location || 'Worldwide')}`;
//       await page.goto(linkedinUrl, { waitUntil: 'networkidle2' });

//       await autoScroll(page);

//       const jobElements = await page.$$('[data-job-id]');
//       for (const jobEl of jobElements.slice(0, 20)) {
//         const title = await jobEl.$eval('.base-search-card__title', el => el.innerText.trim());
//         const company = await jobEl.$eval('.base-search-card__subtitle', el => el.innerText.trim());
//         const loc = await jobEl.$eval('.job-search-card__location', el => el.innerText.trim());
//         const link = await jobEl.$eval('a.base-card__full-link', el => el.href);

//         results.push({ title, company, location: loc, link, source: 'LinkedIn' });
//       }

//       await browser.close();
//     } catch (err) {
//       console.error('LinkedIn scraping failed:', err.message);
//     }

//     res.json({
//       success: true,
//       count: results.length,
//       results: results.slice(0, 50),
//       timestamp: new Date().toISOString(),
//     });

//   } catch (err) {
//     console.error('Global internships scraping error:', err.message);
//     res.status(500).json({ success: false, message: 'Failed to fetch internships', error: err.message });
//   }
// };

// // ===============================
// // Helper: Auto-scroll Puppeteer page
// // ===============================
// async function autoScroll(page) {
//   await page.evaluate(async () => {
//     await new Promise((resolve) => {
//       let totalHeight = 0;
//       const distance = 100;
//       const timer = setInterval(() => {
//         const scrollHeight = document.body.scrollHeight;
//         window.scrollBy(0, distance);
//         totalHeight += distance;
//         if (totalHeight >= scrollHeight - window.innerHeight) {
//           clearInterval(timer);
//           resolve();
//         }
//       }, 200);
//     });
//   });
// }
