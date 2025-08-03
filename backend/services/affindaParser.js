const fetch = require('node-fetch');
const FormData = require('form-data');

async function parseResumeWithAffinda(buffer, filename) {
  const apiKey = process.env.AFFINDA_API_KEY;
  const form = new FormData();
  form.append('file', buffer, filename);

  const response = await fetch('https://api.affinda.com/v2/resumes', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      ...form.getHeaders()
    },
    body: form
  });

  if (!response.ok) {
    throw new Error(`Affinda API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

module.exports = { parseResumeWithAffinda };