/**
 * Extracts candidate personal or professional projects
 * @param {string[]} lines - Split document lines
 * @param {object} sections - Discovered resume sections
 * @returns {string[]} - Array of project logs
 */
function extractProjects(lines, sections) {
  try {
    const projectsSection = sections.projects || [];
    
    if (projectsSection.length === 0) {
      return extractProjectsFromLines(lines);
    }
    
    let projects = [];
    let currentProj = '';
    
    for (let line of projectsSection) {
      if (looksLikeProjectHeader(line)) {
        if (currentProj) {
          projects.push(currentProj.trim());
        }
        currentProj = line;
      } else if (currentProj && line.length > 5) {
        currentProj += ' - ' + line;
      }
    }
    
    if (currentProj) {
      projects.push(currentProj.trim());
    }
    
    return projects.filter(proj => proj.length > 10);
  } catch (error) {
    console.error('Projects extraction module error:', error);
    return [];
  }
}

function extractProjectsFromLines(lines) {
  try {
    const projects = [];
    const projectVerbs = [
      'developed', 'created', 'built', 'implemented', 'designed', 'engineered', 'produced', 'scaled'
    ];

    let currentProj = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lower = line.toLowerCase();
      
      const startsWithVerb = projectVerbs.some(verb => lower.startsWith(verb));
      const containsGithub = lower.includes('github.com');

      if (startsWithVerb || containsGithub) {
        if (currentProj) {
          projects.push(currentProj.trim());
        }
        currentProj = line;
      } else if (currentProj && line.length > 5 && !looksLikeEducationHeaderOrJobHeader(line)) {
        currentProj += ' - ' + line;
      }
    }

    if (currentProj) {
      projects.push(currentProj.trim());
    }

    return projects.filter(proj => proj.length > 10);
  } catch (error) {
    console.error('Projects from lines module error:', error);
    return [];
  }
}

function looksLikeProjectHeader(line) {
  const lower = line.toLowerCase();
  
  // Headers like "Project Name - Description" or containing github links
  return lower.includes('project') || 
         lower.includes('portfolio') || 
         lower.includes('github.com') ||
         /^[A-Z][A-Za-z0-9\s]+[-–]\s+[A-Za-z0-9]/.test(line);
}

function looksLikeEducationHeaderOrJobHeader(line) {
  const lower = line.toLowerCase();
  const degreeKeywords = /bachelor|master|phd|doctorate|diploma|university|college|school|inc\b|ltd\b|corp\b/i;
  return degreeKeywords.test(lower);
}

module.exports = { extractProjects };
