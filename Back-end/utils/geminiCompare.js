const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

async function compareItemsWithGemini(targetItem, candidates) {
  const prompt = `
You are an intelligent lost-and-found matching system.

TARGET ITEM:
${JSON.stringify(targetItem, null, 2)}

CANDIDATE ITEMS:
${JSON.stringify(candidates, null, 2)}

Return ONLY valid JSON in this format:
[
  {
    "candidateId": "string",
    "similarityScore": number,
    "shortReason": "string"
  }
]
`;

  const response = await axios.post(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  let text = response.data.candidates[0].content.parts[0].text;

  // ✅ Clean Markdown code fences
  text = text.replace(/```json|```/g, '').trim();

  return JSON.parse(text);
}

module.exports = { compareItemsWithGemini };
