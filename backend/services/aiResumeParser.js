const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class AIResumeParser {
  constructor() {
    // Using rule-based parsing only
  }

  async parseResume(buffer, filename, mimetype) {
    try {
      // Always use rule-based extraction
      const text = await this.extractText(buffer, mimetype);
      return this.fallbackParsing(text, filename);
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

const aiResumeParser = new AIResumeParser();

export const parseResume = (buffer, filename, mimetype) =>
  aiResumeParser.parseResume(buffer, filename, mimetype); 