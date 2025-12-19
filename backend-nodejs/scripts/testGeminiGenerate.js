require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error('Missing GEMINI_API_KEY in backend-nodejs/.env');
  process.exit(1);
}

const DEFAULT_GEMINI_MODEL = 'gemini-2.5-flash';
const modelName = (process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL).replace(/^models\//, '');

async function main() {
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: modelName });

  const result = await model.generateContent('Reply with a single valid JSON object: {"ok": true}. No extra text.');
  const text = await result.response.text();
  console.log('MODEL:', modelName);
  console.log('RAW:', text);
}

main().catch((err) => {
  console.error('Gemini smoke test failed:', err);
  process.exit(2);
});
