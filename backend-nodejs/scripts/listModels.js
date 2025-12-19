require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error('Missing GEMINI_API_KEY in backend-nodejs/.env');
  process.exit(1);
}

async function main() {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(key)}`;
  const res = await fetch(url);
  const json = await res.json();

  if (!res.ok) {
    console.error('ListModels failed:', JSON.stringify(json, null, 2));
    process.exit(2);
  }

  const models = (json.models || []).map((m) => ({
    name: m.name,
    displayName: m.displayName,
    supportedGenerationMethods: m.supportedGenerationMethods,
  }));

  console.log(JSON.stringify(models, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(3);
});
