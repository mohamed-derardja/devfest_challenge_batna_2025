// controllers/studyController.js
import fs from 'fs/promises';
import path from 'path';
import pdfParse from 'pdf-parse';
import { GoogleGenAI } from '@google/genai';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';

// Initialize Google GenAI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Describe an image using Tesseract OCR with preprocessing
async function describeImage(filePath) {
  try {
    // Optional preprocessing to improve OCR accuracy
    const processedPath = path.join(path.dirname(filePath), 'processed-' + path.basename(filePath));
    await sharp(filePath)
      .grayscale()
      .normalize()
      .toFile(processedPath);

    console.log('Starting OCR...');
    const { data: { text } } = await Tesseract.recognize(processedPath, 'eng', {
      logger: m => console.log(m)
    });

    // Remove processed file
    await fs.unlink(processedPath).catch(() => {});

    return text.trim() || "[No text detected in image]";
  } catch (err) {
    console.error('Error in Tesseract OCR:', err);
    return "[Unable to extract text from image]";
  }
}

// Extract text or description from uploaded file
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
    return "";
  } catch (err) {
    console.error('Error extracting text:', err);
    return "";
  } finally {
    // Always remove the file after processing
    await fs.unlink(filePath).catch(() => {});
  }
}

// Main controller
export const studyAssistant = async (req, res) => {
  try {
    const { prompt } = req.body;
    const file = req.file;

    if (!prompt && !file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide either a prompt or a file'
      });
    }

    let documentText = '';
    let enhancedPrompt = prompt || '';

    if (file) {
      documentText = await extractTextFromFile(file.path, file.mimetype);
      enhancedPrompt = `Document Content (${file.mimetype}):\n${documentText.slice(0, 10000)}\n\nStudent Question: ${prompt || ''}`;
    }

    const systemPrompt = `You are an AI Study Assistant. Provide:
1. Clear explanations with examples
2. Summaries if documents are provided
3. Practice quiz questions
4. Resource recommendations (books, websites, videos)
5. Study schedule suggestions if relevant
Respond only about academic topics and format your response in markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemPrompt}\n\nStudent Prompt: ${enhancedPrompt}`,
      temperature: 0.7,
      maxOutputTokens: 2048
    });

    if (!response.text) throw new Error('No response from AI');

    res.json({
      success: true,
      response: response.text,
      hasDocument: !!file,
      documentType: file?.mimetype || null,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error:', error.message);

    if (req.file?.path) await fs.unlink(req.file.path).catch(() => {});

    res.status(500).json({
      success: false,
      message: 'Failed to process request',
      error: error.message
    });
  }
};
