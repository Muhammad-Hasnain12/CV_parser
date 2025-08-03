const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { HfInference } = require('@huggingface/inference');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { parseResumeWithAffinda } = require('./affindaParser');

class AIResumeParser {
  constructor() {
    this.aiProvider = process.env.AI_PROVIDER || 'huggingface';
    this.model = process.env.AI_MODEL || 'gpt-4';
    this.huggingfaceModel = process.env.HUGGINGFACE_MODEL || 'microsoft/DialoGPT-medium';
    this.temperature = parseFloat(process.env.TEMPERATURE) || 0.1;
    this.maxTokens = parseInt(process.env.MAX_TOKENS) || 4000;

    // Initialize AI clients
    if (this.aiProvider === 'openai') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else if (this.aiProvider === 'anthropic') {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    } else if (this.aiProvider === 'huggingface') {
      this.hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
      
      // Models optimized for different tasks
      this.hfModels = {
        textGeneration: 'microsoft/DialoGPT-medium',
        textClassification: 'facebook/bart-large-mnli',
        tokenClassification: 'dbmdz/bert-large-cased-finetuned-conll03-english',
        questionAnswering: 'deepset/roberta-base-squad2',
        summarization: 'facebook/bart-large-cnn'
      };
    }
  }

  async parseResume(buffer, filename, mimetype) {
    try {
      if (this.aiProvider === 'affinda') {
        console.log('🤖 Using Affinda for parsing...');
        try {
          // Use Affinda API for parsing
          const affindaResult = await parseResumeWithAffinda(buffer, filename);
          console.log('✅ Affinda parsing successful');
          return affindaResult;
        } catch (affindaError) {
          console.error('❌ Affinda parsing failed, falling back to rule-based parsing:', affindaError.message);
          console.log('🔄 Switching to rule-based parsing...');
          
          // Extract text and use rule-based parsing as fallback
          const text = await this.extractText(buffer, mimetype);
          return this.fallbackParsing(text, filename);
        }
      }
      
      // Extract text from file
      const text = await this.extractText(buffer, mimetype);
      
      // Use AI to parse the resume
      const parsedData = await this.parseWithAI(text, filename);
      
      return parsedData;
    } catch (error) {
      console.error('💥 AI Resume Parser Error:', error);
      throw error;
    }
  }

  async extractText(buffer, mimetype) {
    switch (mimetype) {
      case 'application/pdf':
        const pdfData = await pdfParse(buffer);
        return pdfData.text;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        const docxResult = await mammoth.extractRawText({ buffer });
        return docxResult.value;
      case 'text/plain':
        return buffer.toString('utf-8');
      default:
        throw new Error('Unsupported file type');
    }
  }

  async parseWithAI(text, filename) {
    const prompt = this.createPrompt(text, filename);
    
    try {
      if (this.aiProvider === 'openai') {
        return await this.parseWithOpenAI(prompt);
      } else if (this.aiProvider === 'anthropic') {
        return await this.parseWithAnthropic(prompt);
      } else if (this.aiProvider === 'huggingface') {
        return await this.parseWithHuggingFace(text, filename);
      } else {
        throw new Error('Unsupported AI provider');
      }
    } catch (error) {
      console.error('AI parsing failed, falling back to rule-based parsing:', error);
      return this.fallbackParsing(text, filename);
    }
  }

  createPrompt(text, filename) {
    return `You are an expert resume parser. Extract structured information from the following resume text and return it as a valid JSON object.

RESUME TEXT:
${text}

FILENAME: ${filename}

Please extract the following information and return ONLY a valid JSON object with this exact structure:

{
  "name": "Full name of the person",
  "email": "Email address if found, otherwise null",
  "phone": "Phone number if found, otherwise null",
  "skills": ["skill1", "skill2", "skill3"],
  "experience": [
    "Job title and company with dates (e.g., 'Senior Software Engineer at Google (2020-2023)')",
    "Another job entry if found"
  ],
  "education": [
    "Degree and institution with year (e.g., 'Bachelor of Science in Computer Science - Stanford University (2016)')",
    "Another education entry if found"
  ]
}

IMPORTANT GUIDELINES:
1. Extract the name from the first few lines or filename if not clearly stated
2. Format phone numbers consistently as (XXX) XXX-XXXX or +1 (XXX) XXX-XXXX
3. Include technical skills, programming languages, tools, frameworks, and soft skills
4. For experience, include job title, company name, and years if available
5. For education, include degree type, field of study, institution, and graduation year
6. If any field cannot be determined, use null for strings or empty array for arrays
7. Return ONLY the JSON object, no additional text or explanations
8. Ensure the JSON is valid and properly formatted

JSON RESPONSE:`;
  }

  async parseWithOpenAI(prompt) {
    const completion = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: "system",
          content: "You are an expert resume parser. Always respond with valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: this.temperature,
      max_tokens: this.maxTokens,
    });

    const response = completion.choices[0].message.content;
    return this.parseAIResponse(response);
  }

  async parseWithAnthropic(prompt) {
    const message = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: this.maxTokens,
      temperature: this.temperature,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    const response = message.content[0].text;
    return this.parseAIResponse(response);
  }

  async parseWithHuggingFace(text, filename) {
    try {
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const [name, skills, experience, education] = await Promise.all([
        this.extractNameWithHF(text, filename),
        this.extractSkillsWithHF(text),
        this.extractExperienceWithHF(text),
        this.extractEducationWithHF(text)
      ]);
      const email = this.extractEmail(text);
      const phone = this.extractPhone(text);
      const certifications = this.extractCertifications(lines);
      const projects = this.extractProjects(lines);
      const links = this.extractSocialLinks(text);
      return {
        name,
        email,
        phone,
        skills,
        experience,
        education,
        certifications,
        projects,
        links
      };
    } catch (error) {
      console.error('HuggingFace parsing failed:', error);
      throw error;
    }
  }

  async extractNameWithHF(text, filename) {
    try {
      const prompt = `Extract the person's name from this resume text. Return only the name, nothing else.\n\nResume text: ${text.substring(0, 500)}`;
      
      const response = await this.hf.textGeneration({
        model: this.hfModels.textGeneration,
        inputs: prompt,
        parameters: {
          max_new_tokens: 50,
          temperature: 0.1,
          do_sample: false
        }
      });

      const extractedName = response.generated_text.trim();
      
      if (this.isValidName(extractedName)) {
        return extractedName;
      }
    } catch (error) {
      console.error('HF Name extraction failed:', error);
    }

    return this.extractNameRuleBased(text, filename);
  }

  async extractSkillsWithHF(text) {
    try {
      const skillKeywords = [
        'javascript', 'python', 'java', 'react', 'node.js', 'angular', 'vue.js',
        'html', 'css', 'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure',
        'docker', 'kubernetes', 'git', 'agile', 'scrum', 'machine learning',
        'data analysis', 'excel', 'powerpoint', 'word', 'photoshop', 'illustrator',
        'figma', 'sketch', 'ui/ux', 'responsive design', 'api', 'rest', 'graphql',
        'typescript', 'php', 'ruby', 'go', 'rust', 'c++', 'c#', '.net', 'spring',
        'django', 'flask', 'express', 'fastapi', 'laravel', 'rails', 'tensorflow',
        'pytorch', 'scikit-learn', 'pandas', 'numpy', 'matplotlib', 'seaborn',
        'tableau', 'power bi', 'jira', 'confluence', 'slack', 'teams', 'zoom'
      ];

      const foundSkills = [];
      const lowerText = text.toLowerCase();

      skillKeywords.forEach(skill => {
        if (lowerText.includes(skill.toLowerCase())) {
          foundSkills.push(skill);
        }
      });

      // Use NER model to find additional skills
      try {
        const nerResponse = await this.hf.tokenClassification({
          model: this.hfModels.tokenClassification,
          inputs: text.substring(0, 512)
        });

        const potentialSkills = nerResponse
          .filter(token => token.score > 0.8 && token.entity_group === 'MISC')
          .map(token => token.word.replace('##', ''))
          .filter(skill => skill.length > 2 && skill.length < 20);

        foundSkills.push(...potentialSkills.slice(0, 5));
      } catch (error) {
        console.error('NER skill extraction failed:', error);
      }

      return [...new Set(foundSkills)];
    } catch (error) {
      console.error('HF Skill extraction failed:', error);
      return this.extractSkillsRuleBased(text);
    }
  }

  async extractExperienceWithHF(text) {
    try {
      const prompt = `Extract work experience from this resume text. Return only the job titles and companies with dates, one per line.\n\nResume text: ${text}`;
      
      const response = await this.hf.textGeneration({
        model: this.hfModels.textGeneration,
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.1,
          do_sample: false
        }
      });

      const experienceText = response.generated_text.trim();
      const experienceLines = experienceText.split('\n').filter(line => line.trim().length > 0);
      
      if (experienceLines.length > 0) {
        return experienceLines.slice(0, 5);
      }
    } catch (error) {
      console.error('HF Experience extraction failed:', error);
    }

    return this.extractExperienceRuleBased(text);
  }

  async extractEducationWithHF(text) {
    try {
      const prompt = `Extract education information from this resume text. Return only the degrees and institutions with years, one per line.\n\nResume text: ${text}`;
      
      const response = await this.hf.textGeneration({
        model: this.hfModels.textGeneration,
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.1,
          do_sample: false
        }
      });

      const educationText = response.generated_text.trim();
      const educationLines = educationText.split('\n').filter(line => line.trim().length > 0);
      
      if (educationLines.length > 0) {
        return educationLines.slice(0, 3);
      }
    } catch (error) {
      console.error('HF Education extraction failed:', error);
    }

    return this.extractEducationRuleBased(text);
  }

  parseAIResponse(response) {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      const jsonString = jsonMatch[0];
      const parsedData = JSON.parse(jsonString);

      // Validate and clean the parsed data
      return this.validateAndCleanData(parsedData);
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Invalid AI response format');
    }
  }

  validateAndCleanData(data) {
    const cleaned = {
      name: data.name || 'Unknown',
      email: data.email || null,
      phone: data.phone || null,
      skills: Array.isArray(data.skills) ? data.skills.filter(skill => skill && skill.trim()) : [],
      experience: Array.isArray(data.experience) ? data.experience.filter(exp => exp && exp.trim()) : [],
      education: Array.isArray(data.education) ? data.education.filter(edu => edu && edu.trim()) : []
    };

    // Additional validation
    if (cleaned.name === 'Unknown' || cleaned.name.length < 2) {
      cleaned.name = 'Unknown';
    }

    if (cleaned.email && !this.isValidEmail(cleaned.email)) {
      cleaned.email = null;
    }

    if (cleaned.phone && !this.isValidPhone(cleaned.phone)) {
      cleaned.phone = null;
    }

    return cleaned;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return phoneRegex.test(cleanPhone);
  }

  // Fallback parsing method using rule-based approach
  fallbackParsing(text, filename) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    
    return {
      name: this.extractName(lines, filename),
      email: this.extractEmail(text),
      phone: this.extractPhone(text),
      skills: this.extractSkills(text),
      experience: this.extractExperience(lines),
      education: this.extractEducation(lines),
      certifications: this.extractCertifications(lines),
      projects: this.extractProjects(lines),
      links: this.extractSocialLinks(text)
    };
  }

  extractName(lines, filename) {
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i];
      if (line.length > 0 && line.length < 50) {
        const words = line.split(' ').filter(word => word.length > 0);
        if (words.length >= 2 && words.length <= 4) {
          const isName = words.every(word => 
            /^[A-Z][a-z]+$/.test(word) || 
            /^[A-Z][a-z]+\.[A-Z][a-z]+$/.test(word)
          );
          if (isName) {
            return line;
          }
        }
      }
    }

    const nameFromFile = filename.replace(/\.(pdf|docx|txt)$/i, '');
    if (nameFromFile && nameFromFile.length > 0) {
      return nameFromFile.replace(/[_-]/g, ' ');
    }

    return 'Unknown';
  }

  extractEmail(text) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex);
    return emails ? emails[0] : null;
  }

  extractPhone(text) {
    const phoneRegex = /(\+?1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})/g;
    const phones = text.match(phoneRegex);
    if (phones) {
      const phone = phones[0].replace(/\D/g, '');
      if (phone.length === 10) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
      } else if (phone.length === 11 && phone.startsWith('1')) {
        return `+1 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
      }
      return phones[0];
    }
    return null;
  }

  extractSkills(text) {
    const skills = [
      // Programming Languages
      'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'r', 'matlab',
      'typescript', 'dart', 'perl', 'bash', 'powershell', 'assembly', 'cobol', 'fortran',
      
      // Web Technologies
      'html', 'css', 'react', 'angular', 'vue.js', 'node.js', 'express', 'django', 'flask', 'laravel', 'rails',
      'spring', 'asp.net', 'jsp', 'servlets', 'jquery', 'bootstrap', 'sass', 'less', 'webpack', 'babel',
      
      // Databases
      'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sqlite', 'mariadb', 'cassandra', 'neo4j',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'bitbucket',
      'terraform', 'ansible', 'chef', 'puppet', 'vagrant', 'nginx', 'apache',
      
      // Data Science & ML
      'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
      'matplotlib', 'seaborn', 'plotly', 'jupyter', 'spark', 'hadoop', 'kafka', 'elasticsearch',
      
      // Tools & Software
      'excel', 'powerpoint', 'word', 'photoshop', 'illustrator', 'figma', 'sketch', 'invision', 'zeplin',
      'tableau', 'power bi', 'jira', 'confluence', 'slack', 'zoom', 'teams', 'trello', 'asana',
      
      // Frameworks & Libraries
      'fastapi', 'fastify', 'koa', 'hapi', 'sails.js', 'meteor', 'ember.js', 'backbone.js', 'knockout.js',
      'socket.io', 'graphql', 'rest', 'soap', 'grpc', 'thrift', 'protobuf',
      
      // Mobile Development
      'react native', 'flutter', 'xamarin', 'ionic', 'cordova', 'phonegap', 'android studio', 'xcode',
      
      // Other Technologies
      'blockchain', 'ethereum', 'solidity', 'web3', 'iot', 'arduino', 'raspberry pi', 'opencv',
      'computer vision', 'nlp', 'natural language processing', 'ai', 'artificial intelligence'
    ];

    const lowerText = text.toLowerCase();
    
    // Common words to exclude (these appear in resumes but aren't skills)
    const excludeWords = [
      'team', 'teams', 'work', 'working', 'worked', 'experience', 'project', 'projects',
      'development', 'develop', 'developed', 'analysis', 'analyze', 'analyzed',
      'management', 'manage', 'managed', 'leadership', 'lead', 'led', 'communication',
      'collaboration', 'collaborate', 'collaborated', 'problem solving', 'problem-solving',
      'critical thinking', 'time management', 'organization', 'organized'
    ];

    const foundSkills = skills.filter(skill => {
      // Check if skill is in text
      const hasSkill = lowerText.includes(skill.toLowerCase());
      
      // Exclude if it's in the exclude list
      const notExcluded = !excludeWords.includes(skill.toLowerCase());
      
      return hasSkill && notExcluded;
    });
    
    return [...new Set(foundSkills)];
  }

  extractExperience(lines) {
    const experience = [];
    const experienceKeywords = [
      'experience', 'work history', 'employment', 'career', 'professional',
      'job', 'position', 'role', 'responsibilities', 'achievements'
    ];

    let inExperienceSection = false;
    let currentExperience = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      if (experienceKeywords.some(keyword => line.includes(keyword))) {
        inExperienceSection = true;
        continue;
      }

      if (inExperienceSection && (
        line.includes('education') || 
        line.includes('skills') || 
        line.includes('certifications') ||
        line.includes('projects')
      )) {
        break;
      }

      if (inExperienceSection && lines[i].length > 10) {
        if (this.looksLikeJobEntry(lines[i])) {
          if (currentExperience) {
            experience.push(currentExperience.trim());
          }
          currentExperience = lines[i];
        } else if (currentExperience) {
          currentExperience += ' ' + lines[i];
        }
      }
    }

    if (currentExperience) {
      experience.push(currentExperience.trim());
    }

    return experience.slice(0, 5);
  }

  looksLikeJobEntry(line) {
    const hasDate = /\d{4}/.test(line);
    const hasCompany = /(inc|corp|llc|ltd|company|co\.|corporation)/i.test(line);
    const hasTitle = /(manager|director|engineer|developer|analyst|specialist|coordinator|assistant)/i.test(line);
    
    return hasDate || hasCompany || hasTitle;
  }

  extractEducation(lines) {
    const education = [];
    const educationKeywords = [
      'education', 'academic', 'degree', 'university', 'college', 'school',
      'bachelor', 'master', 'phd', 'doctorate', 'diploma', 'certificate'
    ];

    let inEducationSection = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      if (educationKeywords.some(keyword => line.includes(keyword))) {
        inEducationSection = true;
        continue;
      }

      if (inEducationSection && (
        line.includes('experience') || 
        line.includes('skills') || 
        line.includes('projects')
      )) {
        break;
      }

      if (inEducationSection && lines[i].length > 10) {
        if (this.looksLikeEducationEntry(lines[i])) {
          education.push(lines[i].trim());
        }
      }
    }

    return education.slice(0, 3);
  }

  looksLikeEducationEntry(line) {
    const hasDegree = /(bachelor|master|phd|doctorate|associate|diploma|certificate)/i.test(line);
    const hasUniversity = /(university|college|school|institute)/i.test(line);
    const hasYear = /\d{4}/.test(line);
    
    return hasDegree || (hasUniversity && hasYear);
  }

  // Add new section extraction methods
  extractCertifications(lines) {
    const certifications = [];
    const certKeywords = [
      'certification', 'certifications', 'certificate', 'certified', 'course', 'coursera', 'udemy', 'edx', 'meta', 'datacamp'
    ];
    let inCertSection = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (certKeywords.some(keyword => line.includes(keyword))) {
        inCertSection = true;
        continue;
      }
      if (inCertSection && (line.includes('experience') || line.includes('education') || line.includes('projects') || line.includes('skills'))) {
        break;
      }
      if (inCertSection && lines[i].length > 5) {
        certifications.push(lines[i].trim());
      }
    }
    return certifications.slice(0, 5);
  }

  extractProjects(lines) {
    const projects = [];
    const projectKeywords = [
      'project', 'projects', 'hackathon', 'competition', 'challenge', 'case study', 'portfolio'
    ];
    let inProjectSection = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (projectKeywords.some(keyword => line.includes(keyword))) {
        inProjectSection = true;
        continue;
      }
      if (inProjectSection && (line.includes('experience') || line.includes('education') || line.includes('certification') || line.includes('skills'))) {
        break;
      }
      if (inProjectSection && lines[i].length > 5) {
        projects.push(lines[i].trim());
      }
    }
    return projects.slice(0, 5);
  }

  extractSocialLinks(text) {
    const links = [];
    // GitHub links only
    const githubRegex = /(?:github\.com\/|github:?\s*)([a-zA-Z0-9_-]+)/gi;
    const githubMatches = text.match(githubRegex);
    if (githubMatches) {
      githubMatches.forEach(match => {
        const username = match.replace(/github\.com\/|github:?\s*/gi, '');
        links.push(`https://github.com/${username}`);
      });
    }
    return [...new Set(links)];
  }
}

// Create singleton instance
const aiResumeParser = new AIResumeParser();

module.exports = {
  parseResume: (buffer, filename, mimetype) => aiResumeParser.parseResume(buffer, filename, mimetype)
}; 