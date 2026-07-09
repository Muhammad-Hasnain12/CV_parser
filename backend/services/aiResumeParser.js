const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

// Import modular extractors
const { performOCR } = require('./extractors/ocrEngine');
const { preprocessText } = require('./extractors/textPreprocessor');
const { extractName } = require('./extractors/nameExtractor');
const { extractSkills } = require('./extractors/skillsExtractor');
const { extractExperience } = require('./extractors/experienceExtractor');
const { extractEducation } = require('./extractors/educationExtractor');
const { extractProjects } = require('./extractors/projectExtractor');
const { extractContactInfo } = require('./extractors/contactExtractor');
const { validateAndScoreData } = require('./extractors/validationLayer');
const { parseWithAI } = require('./extractors/aiProvider');

class AIResumeParser {
  async parseResume(buffer, filename, mimetype) {
    try {
      if (!buffer || buffer.length === 0) {
        throw new Error('Empty or invalid file provided');
      }

      // 1. Text Extraction (with Tesseract OCR Fallback for scanned PDFs)
      let text = await this.extractText(buffer, mimetype);
      
      if (!text || text.trim().length < 15) {
        console.log('⚠️ Text extraction yielded blank or insufficient characters. Attempting Tesseract OCR fallback...');
        text = await performOCR(buffer);
      }

      if (!text || text.trim().length === 0) {
        throw new Error('Could not extract readable text content from the resume. Please check file format.');
      }

      // 2. Text Preprocessing
      const cleanedText = preprocessText(text);

      // 3. AI Extraction Strategy (Highest Priority)
      let parsedData = await parseWithAI(cleanedText);

      // 4. Heuristic Fallback Strategy (If no AI key or API failure)
      if (!parsedData) {
        console.log('ℹ️ AI Provider not configured or failed. Falling back to heuristic rules engine...');
        parsedData = this.fallbackRulesParsing(cleanedText, filename);
      }

      // 5. Validation, Deduplication, & Confidence Scoring
      const finalizedData = validateAndScoreData(parsedData);
      
      console.log('✅ Finalized structured parsing logs');
      return finalizedData;

    } catch (error) {
      console.error('💥 AI Resume Parser Orchestrator Error:', error);
      throw error;
    }
  }

  async extractText(buffer, mimetype) {
    try {
      switch (mimetype) {
        case 'application/pdf':
          const pdfData = await pdfParse(buffer);
          return pdfData.text || '';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          const docxResult = await mammoth.extractRawText({ buffer });
          return docxResult.value || '';
        case 'text/plain':
          return buffer.toString('utf-8');
        default:
          throw new Error('Unsupported file type');
      }
    } catch (error) {
      console.error('Core text extraction failed:', error);
      return ''; // Graceful fail to trigger OCR fallback
    }
  }

  fallbackRulesParsing(text, filename) {
    const lines = text.split('\n');
    const sections = this.classifySections(lines);
    const contact = extractContactInfo(text);

    return {
      name: extractName(text, filename, sections),
      email: contact.email,
      phone: contact.phone,
      skills: extractSkills(text, sections),
      experience: extractExperience(lines, sections),
      education: extractEducation(lines, sections),
      certifications: this.extractCertifications(lines, sections),
      projects: extractProjects(lines, sections),
      links: contact.links
    };
  }

  classifySections(lines) {
    const sections = {
      header: [],
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      projects: [],
      contact: []
    };

    let currentSection = 'header';
    
    for (let line of lines) {
      const lower = line.toLowerCase().trim();
      
      if (lower.includes('experience') || lower.includes('work history') || lower.includes('employment') || lower.includes('career')) {
        currentSection = 'experience';
      } else if (lower.includes('education') || lower.includes('academic') || lower.includes('study')) {
        currentSection = 'education';
      } else if (lower.includes('skills') || lower.includes('competencies') || lower.includes('technologies') || lower.includes('expertise')) {
        currentSection = 'skills';
      } else if (lower.includes('certification') || lower.includes('certificates') || lower.includes('licenses')) {
        currentSection = 'certifications';
      } else if (lower.includes('project') || lower.includes('portfolio')) {
        currentSection = 'projects';
      } else if (lower.includes('contact') || lower.includes('personal info')) {
        currentSection = 'contact';
      }
      
      sections[currentSection].push(line);
    }
    
    return sections;
  }

  extractCertifications(lines, sections) {
    const certSection = sections.certifications || [];
    const certSource = certSection.length > 0 ? certSection : lines;
    const certs = [];

    for (let line of certSource) {
      const lower = line.toLowerCase();
      const match = lower.includes('certified') || 
                    lower.includes('certification') || 
                    lower.includes('certificate') || 
                    lower.includes('aws') || 
                    lower.includes('azure') || 
                    lower.includes('scrum') || 
                    lower.includes('pmp');
      
      if (match && line.length > 5 && line.length < 100) {
        certs.push(line);
      }
    }
    return [...new Set(certs)];
  }
}

const aiResumeParser = new AIResumeParser();

module.exports = {
  parseResume: (buffer, filename, mimetype) =>
    aiResumeParser.parseResume(buffer, filename, mimetype),
  AIResumeParser
};