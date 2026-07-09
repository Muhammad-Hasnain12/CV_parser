/**
 * Extracts chronological work history logs
 * @param {string[]} lines - Split document lines
 * @param {object} sections - Discovered resume sections
 * @returns {string[]} - Array of experience logs
 */
function extractExperience(lines, sections) {
  try {
    const experienceSection = sections.experience || [];
    
    if (experienceSection.length === 0) {
      // Fallback: search general lines
      return extractExperienceFromLines(lines);
    }
    
    let experience = [];
    let currentJob = '';
    let inJobBlock = false;
    
    for (let i = 0; i < experienceSection.length; i++) {
      const line = experienceSection[i];
      
      // If it looks like a job header, push the previous one and start a new block
      if (looksLikeJobHeader(line)) {
        if (currentJob) {
          experience.push(currentJob.trim());
        }
        currentJob = line;
        inJobBlock = true;
      } else if (inJobBlock) {
        if (line.length > 5) {
          currentJob += '\n' + line;
        }
      }
    }
    
    if (currentJob) {
      experience.push(currentJob.trim());
    }
    
    // Clean up empty lines or brief descriptions
    return experience.filter(exp => exp.length > 15);
  } catch (error) {
    console.error('Experience extraction module error:', error);
    return [];
  }
}

function extractExperienceFromLines(lines) {
  try {
    const experience = [];
    const jobKeywords = [
      'experience', 'work history', 'employment', 'career', 'professional',
      'job', 'position', 'role', 'responsibilities', 'achievements', 'internship'
    ];

    let inExperienceSection = false;
    let currentExperience = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      // Detect transition to experience header
      if (jobKeywords.some(keyword => line.includes(keyword) && line.length < 30)) {
        inExperienceSection = true;
        continue;
      }

      // Detect transition to other sections
      if (inExperienceSection && (
        line.includes('education') || 
        line.includes('skills') || 
        line.includes('certifications') ||
        line.includes('projects') ||
        line.includes('contact')
      ) && line.length < 25) {
        break;
      }

      if (inExperienceSection && lines[i].length > 5) {
        if (looksLikeJobHeader(lines[i])) {
          if (currentExperience) {
            experience.push(currentExperience.trim());
          }
          currentExperience = lines[i];
        } else if (currentExperience) {
          currentExperience += '\n' + lines[i];
        }
      }
    }

    if (currentExperience) {
      experience.push(currentExperience.trim());
    }

    return experience.filter(exp => exp.length > 15);
  } catch (error) {
    console.error('Experience from lines module error:', error);
    return [];
  }
}

function looksLikeJobHeader(line) {
  // Regex to detect common date durations (e.g. 2021-2023, 2022 - Present, June 2020 - Dec 2021)
  const datePattern = /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|present|\b\d{4}\b)/i;
  const hasDate = datePattern.test(line);

  // Common corporate indicators
  const jobIndicators = /developer|engineer|manager|lead|analyst|designer|consultant|architect|intern|specialist|officer|coordinator|administrator|supervisor|director|president/i;
  const companyIndicators = /inc\b|ltd\b|corp\b|co\b|solutions|technologies|group|company|agency/i;
  
  const hasJob = jobIndicators.test(line);
  const hasCompany = companyIndicators.test(line);

  return hasDate && (hasJob || hasCompany);
}

module.exports = { extractExperience };
