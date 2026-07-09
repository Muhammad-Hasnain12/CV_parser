const { OpenAI } = require('openai');
const { Anthropic } = require('@anthropic-ai/sdk');
const { HfInference } = require('@huggingface/inference');
const fetch = require('node-fetch');

const EXTRACTION_PROMPT = `
You are a professional resume parsing engine. Extract structured details from the following resume text.
Return ONLY a valid JSON object matching the schema below. Do not include any explanations, warnings, or markdown code fences.

JSON Schema:
{
  "name": "string (Candidate's full name)",
  "email": "string (Candidate's email)",
  "phone": "string (Candidate's phone number)",
  "skills": ["string (Individual skills/technologies)"],
  "experience": ["string (Chronological job history entries: Title, Company, Dates, Description)"],
  "education": ["string (Education entries: Degree, School, Dates, CGPA)"],
  "certifications": ["string (Certifications listed)"],
  "projects": ["string (Projects listed: Title - Description)"],
  "links": ["string (GitHub, LinkedIn, or portfolio URLs found)"]
}
`;

/**
 * Parses resume text using the configured AI LLM provider
 * @param {string} text - Cleaned resume text
 * @returns {Promise<object|null>} - Parsed resume structure or null if fallback is needed
 */
async function parseWithAI(text) {
  try {
    // 1. OpenAI GPT-4 Fallback Provider
    if (process.env.OPENAI_API_KEY) {
      console.log('🤖 Invoking OpenAI GPT-4 parser...');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: EXTRACTION_PROMPT },
          { role: 'user', content: text }
        ],
        temperature: 0.1
      });
      return parseLLMResponse(completion.choices[0].message.content);
    }

    // 2. Anthropic Claude Provider
    if (process.env.CLAUDE_API_KEY) {
      console.log('🤖 Invoking Anthropic Claude parser...');
      const anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
      const message = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4000,
        messages: [
          { role: 'user', content: `${EXTRACTION_PROMPT}\n\nResume Text:\n${text}` }
        ],
        temperature: 0.1
      });
      return parseLLMResponse(message.content[0].text);
    }

    // 3. Google Gemini REST API Provider (Using fetch to avoid bulky SDK wrapper)
    if (process.env.GEMINI_API_KEY) {
      console.log('🤖 Invoking Google Gemini 1.5 parser...');
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: `${EXTRACTION_PROMPT}\n\nResume Text:\n${text}` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        return parseLLMResponse(responseText);
      } else {
        const errorText = await response.text();
        console.error('Gemini REST API failure:', errorText);
      }
    }

    // 4. Hugging Face Inference API
    if (process.env.HUGGINGFACE_API_KEY) {
      console.log('🤖 Invoking Hugging Face Llama-3 parser...');
      const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
      const output = await hf.textGeneration({
        model: 'meta-llama/Meta-Llama-3-8B-Instruct',
        inputs: `<|system|>\n${EXTRACTION_PROMPT}\n<|user|>\n${text}\n<|assistant|>\n`,
        parameters: { max_new_tokens: 1500, temperature: 0.1 }
      });
      return parseLLMResponse(output.generated_text);
    }

    // No AI provider is configured
    return null;
  } catch (error) {
    console.error('💥 AI Provider Error:', error);
    return null; // Gracefully return null to allow falling back to rules-based parsers
  }
}

function parseLLMResponse(responseText) {
  if (!responseText) return null;
  
  let cleaned = responseText.trim();
  
  // Strip Markdown JSON code blocks if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  
  cleaned = cleaned.trim();
  
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('Failed to parse JSON string returned by LLM:', error);
    console.error('Raw LLM Response was:', responseText);
    return null;
  }
}

module.exports = { parseWithAI };
