const path = require('path');

/**
 * Extracts candidate full name using multiple strategies
 * @param {string} text - Cleaned resume text
 * @param {string} filename - Name of the uploaded file
 * @param {object} sections - Discovered resume sections
 * @returns {string} - Discovered candidate name
 */
function extractName(text, filename, sections) {
  try {
    // Strategy 1: Scan the top lines (header section) for name patterns
    const headerLines = (sections.header || []).slice(0, 8);
    
    for (let line of headerLines) {
      // Avoid lines that look like emails, URLs, or generic contact keywords
      const isContactKeyword = /phone|email|address|link|github|linkedin|cv|resume/i.test(line);
      if (isContactKeyword) continue;
      
      // Standard Name Pattern: First Last (capitalized, letters only)
      const namePattern = /^[A-Z][a-z]+(?:\s+[A-Z]\.)?\s+[A-Z][a-z]+$/;
      if (namePattern.test(line)) {
        return line;
      }
      
      // Caps Pattern (Commonly used at the very top of CVs)
      const capsPattern = /^[A-Z\s]{3,25}$/;
      if (capsPattern.test(line) && line.split(' ').length >= 2) {
        return line.trim();
      }
    }

    // Strategy 2: Look for email patterns to extract name
    const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
    if (emailMatch) {
      const emailName = emailMatch[0].split('@')[0];
      // Split on common email separators (. _ -)
      const nameFromEmail = emailName.replace(/[._-]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      if (nameFromEmail.length > 3 && !/\d/.test(nameFromEmail)) {
        return nameFromEmail;
      }
    }

    // Strategy 3: Parse from uploaded filename
    if (filename) {
      const cleanedFile = filename.replace(/\.(pdf|docx|txt)$/i, '')
        .replace(/[_-]/g, ' ')
        .replace(/\d+/g, '') // remove numbers
        .trim();
      
      const nameFromFile = cleanedFile.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      if (nameFromFile.length > 3 && nameFromFile.split(' ').length >= 2) {
        return nameFromFile;
      }
    }

    return 'Unknown Candidate';
  } catch (error) {
    console.error('Name extraction module error:', error);
    return 'Unknown Candidate';
  }
}

module.exports = { extractName };
