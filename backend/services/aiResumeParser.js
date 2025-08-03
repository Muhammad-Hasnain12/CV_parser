const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class AIResumeParser {
  constructor() {
    // Enhanced parsing with multiple strategies
  }

  async parseResume(buffer, filename, mimetype) {
    try {
      const text = await this.extractText(buffer, mimetype);
      return this.advancedParsing(text, filename);
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

  // Advanced parsing with multiple extraction strategies
  advancedParsing(text, filename) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const sections = this.identifySections(lines);
    
    return {
      name: this.extractNameAdvanced(text, filename, sections),
      email: this.extractEmailAdvanced(text),
      phone: this.extractPhoneAdvanced(text),
      skills: this.extractSkillsAdvanced(text, sections),
      experience: this.extractExperienceAdvanced(lines, sections),
      education: this.extractEducationAdvanced(lines, sections),
      certifications: this.extractCertificationsAdvanced(lines, sections),
      projects: this.extractProjectsAdvanced(lines, sections),
      links: this.extractSocialLinksAdvanced(text)
    };
  }

  // Identify different sections in the resume
  identifySections(lines) {
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
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      // Detect section headers
      if (line.includes('experience') || line.includes('work history') || line.includes('employment')) {
        currentSection = 'experience';
      } else if (line.includes('education') || line.includes('academic')) {
        currentSection = 'education';
      } else if (line.includes('skills') || line.includes('competencies') || line.includes('technologies')) {
        currentSection = 'skills';
      } else if (line.includes('certification') || line.includes('certificates')) {
        currentSection = 'certifications';
      } else if (line.includes('project') || line.includes('portfolio')) {
        currentSection = 'projects';
      } else if (line.includes('contact') || line.includes('personal')) {
        currentSection = 'contact';
      }
      
      sections[currentSection].push(lines[i]);
    }
    
    return sections;
  }

  extractNameAdvanced(text, filename, sections) {
    // Strategy 1: Look for name patterns in header section
    const headerLines = sections.header.slice(0, 10);
    
    for (let line of headerLines) {
      // Pattern: First Last or First M. Last
      const namePattern = /^[A-Z][a-z]+(?:\s+[A-Z]\.)?\s+[A-Z][a-z]+$/;
      if (namePattern.test(line)) {
        return line;
      }
      
      // Pattern: ALL CAPS name (common in resumes)
      const capsPattern = /^[A-Z\s]{3,30}$/;
      if (capsPattern.test(line) && line.split(' ').length >= 2) {
        return line;
      }
    }
    
    // Strategy 2: Look for email patterns to extract name
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
    if (emailMatch) {
      const emailName = emailMatch[0].split('@')[0];
      // Convert email name to proper case
      const nameFromEmail = emailName.replace(/[._-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      if (nameFromEmail.length > 3) {
        return nameFromEmail;
      }
    }
    
    // Strategy 3: Extract from filename
    const nameFromFile = filename.replace(/\.(pdf|docx|txt)$/i, '')
      .replace(/[_-]/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    if (nameFromFile.length > 3) {
      return nameFromFile;
    }
    
    return 'Unknown';
  }

  extractEmailAdvanced(text) {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex);
    
    if (emails) {
      // Prefer professional email domains
      const professionalDomains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
      const professionalEmail = emails.find(email => 
        professionalDomains.some(domain => email.toLowerCase().includes(domain))
      );
      
      return professionalEmail || emails[0];
    }
    
    return null;
  }

  extractPhoneAdvanced(text) {
    // Multiple phone number patterns
    const phonePatterns = [
      /(\+?1[-.]?)?\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})/g, // US format
      /(\+[0-9]{1,3}[-.]?)?\(?([0-9]{2,4})\)?[-.]?([0-9]{3,4})[-.]?([0-9]{3,4})/g, // International
      /[0-9]{3}[-.]?[0-9]{3}[-.]?[0-9]{4}/g, // Simple format
    ];
    
    for (let pattern of phonePatterns) {
      const phones = text.match(pattern);
      if (phones) {
        const phone = phones[0].replace(/\D/g, '');
        
        // Format US numbers
        if (phone.length === 10) {
          return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
        } else if (phone.length === 11 && phone.startsWith('1')) {
          return `+1 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7)}`;
        }
        
        return phones[0];
      }
    }
    
    return null;
  }

  extractSkillsAdvanced(text, sections) {
    const comprehensiveSkills = [
      // Programming Languages
      'javascript', 'python', 'java', 'c++', 'c#', 'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'r', 'matlab',
      'typescript', 'dart', 'perl', 'bash', 'powershell', 'assembly', 'cobol', 'fortran', 'elixir', 'clojure', 'haskell',
      
      // Web Technologies
      'html', 'css', 'react', 'angular', 'vue.js', 'node.js', 'express', 'django', 'flask', 'laravel', 'rails',
      'spring', 'asp.net', 'jsp', 'servlets', 'jquery', 'bootstrap', 'sass', 'less', 'webpack', 'babel',
      'next.js', 'nuxt.js', 'gatsby', 'svelte', 'ember.js', 'backbone.js', 'meteor',
      
      // Databases
      'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'oracle', 'sqlite', 'mariadb', 'cassandra', 'neo4j',
      'dynamodb', 'firebase', 'supabase', 'prisma', 'sequelize', 'mongoose',
      
      // Cloud & DevOps
      'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github', 'gitlab', 'bitbucket',
      'terraform', 'ansible', 'chef', 'puppet', 'vagrant', 'nginx', 'apache', 'vault', 'consul',
      
      // Data Science & ML
      'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
      'matplotlib', 'seaborn', 'plotly', 'jupyter', 'spark', 'hadoop', 'kafka', 'elasticsearch',
      'opencv', 'nltk', 'spacy', 'transformers', 'bert', 'gpt', 'xgboost', 'lightgbm',
      
      // Tools & Software
      'excel', 'powerpoint', 'word', 'photoshop', 'illustrator', 'figma', 'sketch', 'invision', 'zeplin',
      'tableau', 'power bi', 'jira', 'confluence', 'slack', 'zoom', 'teams', 'trello', 'asana',
      'notion', 'monday.com', 'clickup', 'linear', 'notion', 'obsidian',
      
      // Frameworks & Libraries
      'fastapi', 'fastify', 'koa', 'hapi', 'sails.js', 'meteor', 'ember.js', 'backbone.js', 'knockout.js',
      'socket.io', 'graphql', 'rest', 'soap', 'grpc', 'thrift', 'protobuf', 'apollo', 'prisma',
      
      // Mobile Development
      'react native', 'flutter', 'xamarin', 'ionic', 'cordova', 'phonegap', 'android studio', 'xcode',
      'swiftui', 'kotlin', 'objective-c', 'java android',
      
      // Other Technologies
      'blockchain', 'ethereum', 'solidity', 'web3', 'iot', 'arduino', 'raspberry pi', 'opencv',
      'computer vision', 'nlp', 'natural language processing', 'ai', 'artificial intelligence',
      'microservices', 'serverless', 'lambda', 'api gateway', 'cloudfront', 's3', 'ec2', 'rds'
    ];

    const lowerText = text.toLowerCase();
    const skillsSection = sections.skills.join(' ').toLowerCase();
    
    // Words to exclude (appear in resumes but aren't skills)
    const excludeWords = [
      'team', 'teams', 'work', 'working', 'worked', 'experience', 'project', 'projects',
      'development', 'develop', 'developed', 'analysis', 'analyze', 'analyzed',
      'management', 'manage', 'managed', 'leadership', 'lead', 'led', 'communication',
      'collaboration', 'collaborate', 'collaborated', 'problem solving', 'problem-solving',
      'critical thinking', 'time management', 'organization', 'organized', 'responsible',
      'responsibilities', 'achievement', 'achievements', 'improved', 'increased', 'decreased',
      'implemented', 'developed', 'created', 'designed', 'built', 'maintained', 'managed'
    ];

    const foundSkills = comprehensiveSkills.filter(skill => {
      // Check if skill is in text or skills section
      const hasSkill = lowerText.includes(skill.toLowerCase()) || 
                      skillsSection.includes(skill.toLowerCase());
      
      // Exclude if it's in the exclude list
      const notExcluded = !excludeWords.includes(skill.toLowerCase());
      
      return hasSkill && notExcluded;
    });
    
    // Remove duplicates and sort
    return [...new Set(foundSkills)].sort();
  }

  extractExperienceAdvanced(lines, sections) {
    const experience = [];
    const experienceSection = sections.experience;
    
    if (experienceSection.length === 0) {
      // Fallback: look for job patterns in all lines
      return this.extractExperienceFromLines(lines);
    }
    
    let currentJob = '';
    let inJobSection = false;
    
    for (let i = 0; i < experienceSection.length; i++) {
      const line = experienceSection[i];
      
      // Detect job entries
      if (this.looksLikeJobEntry(line)) {
        if (currentJob) {
          experience.push(currentJob.trim());
        }
        currentJob = line;
        inJobSection = true;
      } else if (inJobSection && line.length > 10) {
        // Continue current job description
        currentJob += ' ' + line;
      } else if (line.toLowerCase().includes('education') || 
                 line.toLowerCase().includes('skills')) {
        // End of experience section
        break;
      }
    }
    
    if (currentJob) {
      experience.push(currentJob.trim());
    }
    
    return experience.filter(exp => exp.length > 10);
  }

  extractExperienceFromLines(lines) {
    const experience = [];
    const jobKeywords = [
      'experience', 'work history', 'employment', 'career', 'professional',
      'job', 'position', 'role', 'responsibilities', 'achievements', 'internship'
    ];

    let inExperienceSection = false;
    let currentExperience = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      if (jobKeywords.some(keyword => line.includes(keyword))) {
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

    return experience.filter(exp => exp.length > 10);
  }

  looksLikeJobEntry(line) {
    const jobPatterns = [
      /^[A-Z][a-z]+\s+[A-Z][a-z]+/, // Company Name
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+/, // Company Name with more words
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+\d{4}/, // Company Name with year
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+[-–]\s+\d{4}/, // Company Name - Year
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+\s+\d{4}/, // Company Name with title and year
    ];
    
    return jobPatterns.some(pattern => pattern.test(line));
  }

  extractEducationAdvanced(lines, sections) {
    const education = [];
    const educationSection = sections.education;
    
    if (educationSection.length === 0) {
      // Fallback: look for education patterns in all lines
      return this.extractEducationFromLines(lines);
    }
    
    let currentEducation = '';
    let inEducationSection = false;
    
    for (let i = 0; i < educationSection.length; i++) {
      const line = educationSection[i];
      
      // Detect education entries
      if (this.looksLikeEducationEntry(line)) {
        if (currentEducation) {
          education.push(currentEducation.trim());
        }
        currentEducation = line;
        inEducationSection = true;
      } else if (inEducationSection && line.length > 10) {
        // Continue current education description
        currentEducation += ' ' + line;
      } else if (line.toLowerCase().includes('experience') || 
                 line.toLowerCase().includes('skills')) {
        // End of education section
        break;
      }
    }
    
    if (currentEducation) {
      education.push(currentEducation.trim());
    }
    
    return education.filter(edu => edu.length > 10);
  }

  extractEducationFromLines(lines) {
    const education = [];
    const educationKeywords = [
      'education', 'academic', 'degree', 'university', 'college', 'school',
      'bachelor', 'master', 'phd', 'doctorate', 'diploma', 'certificate'
    ];

    let inEducationSection = false;
    let currentEducation = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      if (educationKeywords.some(keyword => line.includes(keyword))) {
        inEducationSection = true;
        continue;
      }

      if (inEducationSection && (
        line.includes('experience') || 
        line.includes('skills') || 
        line.includes('certifications') ||
        line.includes('projects')
      )) {
        break;
      }

      if (inEducationSection && lines[i].length > 10) {
        if (this.looksLikeEducationEntry(lines[i])) {
          if (currentEducation) {
            education.push(currentEducation.trim());
          }
          currentEducation = lines[i];
        } else if (currentEducation) {
          currentEducation += ' ' + lines[i];
        }
      }
    }

    if (currentEducation) {
      education.push(currentEducation.trim());
    }

    return education.filter(edu => edu.length > 10);
  }

  looksLikeEducationEntry(line) {
    const educationPatterns = [
      /^[A-Z][a-z]+\s+[A-Z][a-z]+/, // University Name
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+/, // University Name with more words
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+\d{4}/, // University Name with year
      /^[A-Z][a-z]+\s+[A-Z][a-z]+\s+[-–]\s+\d{4}/, // University Name - Year
      /bachelor/i, /master/i, /phd/i, /doctorate/i, /diploma/i,
    ];
    
    return educationPatterns.some(pattern => pattern.test(line));
  }

  extractCertificationsAdvanced(lines, sections) {
    const certifications = [];
    const certSection = sections.certifications;
    
    if (certSection.length === 0) {
      // Look for certifications in all lines
      return this.extractCertificationsFromLines(lines);
    }
    
    for (let line of certSection) {
      if (line.toLowerCase().includes('certification') || 
          line.toLowerCase().includes('certificate') ||
          line.toLowerCase().includes('certified')) {
        certifications.push(line);
      }
    }
    
    return certifications.filter(cert => cert.length > 5);
  }

  extractCertificationsFromLines(lines) {
    const certifications = [];
    
    for (let line of lines) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('certification') || 
          lowerLine.includes('certificate') ||
          lowerLine.includes('certified') ||
          lowerLine.includes('aws') ||
          lowerLine.includes('azure') ||
          lowerLine.includes('google cloud') ||
          lowerLine.includes('pmp') ||
          lowerLine.includes('scrum')) {
        certifications.push(line);
      }
    }
    
    return certifications.filter(cert => cert.length > 5);
  }

  extractProjectsAdvanced(lines, sections) {
    const projects = [];
    const projectsSection = sections.projects;
    
    if (projectsSection.length === 0) {
      // Look for projects in all lines
      return this.extractProjectsFromLines(lines);
    }
    
    let currentProject = '';
    
    for (let line of projectsSection) {
      if (line.toLowerCase().includes('project') || 
          line.toLowerCase().includes('portfolio') ||
          line.toLowerCase().includes('github.com')) {
        if (currentProject) {
          projects.push(currentProject.trim());
        }
        currentProject = line;
      } else if (currentProject && line.length > 10) {
        currentProject += ' ' + line;
      }
    }
    
    if (currentProject) {
      projects.push(currentProject.trim());
    }
    
    return projects.filter(project => project.length > 10);
  }

  extractProjectsFromLines(lines) {
    const projects = [];
    
    for (let line of lines) {
      const lowerLine = line.toLowerCase();
      if (lowerLine.includes('project') || 
          lowerLine.includes('portfolio') ||
          lowerLine.includes('github.com') ||
          lowerLine.includes('developed') ||
          lowerLine.includes('built') ||
          lowerLine.includes('created')) {
        projects.push(line);
      }
    }
    
    return projects.filter(project => project.length > 10);
  }

  extractSocialLinksAdvanced(text) {
    const links = [];
    
    // GitHub links only - more accurate extraction
    const githubRegex = /(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+/g;
    const githubLinks = text.match(githubRegex);
    if (githubLinks) {
      links.push(...githubLinks.map(link => 
        link.startsWith('http') ? link : `https://${link}`
      ));
    }
    
    // LinkedIn links - professional profiles
    const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/g;
    const linkedinLinks = text.match(linkedinRegex);
    if (linkedinLinks) {
      links.push(...linkedinLinks.map(link => 
        link.startsWith('http') ? link : `https://${link}`
      ));
    }
    
    // Remove general website extraction - only GitHub and LinkedIn
    return [...new Set(links)];
  }
}

const aiResumeParser = new AIResumeParser();

export const parseResume = (buffer, filename, mimetype) =>
  aiResumeParser.parseResume(buffer, filename, mimetype); 