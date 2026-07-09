/**
 * Extracts candidate academic history logs
 * @param {string[]} lines - Split document lines
 * @param {object} sections - Discovered resume sections
 * @returns {string[]} - Array of education entries
 */
function extractEducation(lines, sections) {
  try {
    const educationSection = sections.education || [];
    
    if (educationSection.length === 0) {
      return extractEducationFromLines(lines);
    }
    
    let education = [];
    let currentEdu = '';
    let inEduBlock = false;
    
    for (let i = 0; i < educationSection.length; i++) {
      const line = educationSection[i];
      
      if (looksLikeEducationHeader(line)) {
        if (currentEdu) {
          education.push(currentEdu.trim());
        }
        currentEdu = line;
        inEduBlock = true;
      } else if (inEduBlock) {
        if (line.length > 5) {
          currentEdu += ' - ' + line;
        }
      }
    }
    
    if (currentEdu) {
      education.push(currentEdu.trim());
    }
    
    return education.filter(edu => edu.length > 10);
  } catch (error) {
    console.error('Education extraction module error:', error);
    return [];
  }
}

function extractEducationFromLines(lines) {
  try {
    const education = [];
    const eduKeywords = [
      'education', 'academic', 'degree', 'university', 'college', 'school',
      'bachelor', 'master', 'phd', 'doctorate', 'diploma'
    ];

    let inEducationSection = false;
    let currentEdu = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      
      if (eduKeywords.some(keyword => line.includes(keyword) && line.length < 30)) {
        inEducationSection = true;
        continue;
      }

      if (inEducationSection && (
        line.includes('experience') || 
        line.includes('skills') || 
        line.includes('certifications') ||
        line.includes('projects') ||
        line.includes('contact')
      ) && line.length < 25) {
        break;
      }

      if (inEducationSection && lines[i].length > 5) {
        if (looksLikeEducationHeader(lines[i])) {
          if (currentEdu) {
            education.push(currentEdu.trim());
          }
          currentEdu = lines[i];
        } else if (currentEdu) {
          currentEdu += ' - ' + lines[i];
        }
      }
    }

    if (currentEdu) {
      education.push(currentEdu.trim());
    }

    return education.filter(edu => edu.length > 10);
  } catch (error) {
    console.error('Education from lines module error:', error);
    return [];
  }
}

function looksLikeEducationHeader(line) {
  const lower = line.toLowerCase();
  
  // Degree prefixes/keywords
  const degreeKeywords = /bachelor|master|phd|doctorate|diploma|degree|b\.s\b|m\.s\b|b\.a\b|bba|bs|ms|be\b|me\b/i;
  // Institutional indicators
  const schoolKeywords = /university|college|school|institute|academy|polytechnic/i;
  
  const hasDegree = degreeKeywords.test(lower);
  const hasSchool = schoolKeywords.test(lower);
  const hasYear = /\b\d{4}\b/.test(lower);

  return hasDegree || hasSchool || (hasYear && (hasDegree || hasSchool));
}

module.exports = { extractEducation };
