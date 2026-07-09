/**
 * Validates, deduplicates, and scores the extracted resume dataset
 * @param {object} rawData - Extracted resume details
 * @returns {object} - Cleaned resume data with confidence scores
 */
function validateAndScoreData(rawData) {
  try {
    const validated = {
      name: (rawData.name || 'Unknown Candidate').trim(),
      email: (rawData.email || '').trim(),
      phone: (rawData.phone || '').trim(),
      skills: deduplicateArray(rawData.skills || []),
      experience: deduplicateArray(rawData.experience || []).filter(item => item.length > 10),
      education: deduplicateArray(rawData.education || []).filter(item => item.length > 5),
      certifications: deduplicateArray(rawData.certifications || []).filter(item => item.length > 5),
      projects: deduplicateArray(rawData.projects || []).filter(item => item.length > 10),
      links: deduplicateArray(rawData.links || []).filter(link => /^https?:\/\//.test(link))
    };

    // Calculate section-level confidence scores (0-100%)
    const confidenceScores = {
      personal: calculatePersonalScore(validated),
      skills: calculateSkillsScore(validated.skills),
      experience: calculateExperienceScore(validated.experience),
      education: calculateEducationScore(validated.education),
      projects: calculateProjectsScore(validated.projects),
      certifications: calculateCertificationsScore(validated.certifications),
      links: calculateLinksScore(validated.links)
    };

    return {
      ...validated,
      confidenceScores
    };
  } catch (error) {
    console.error('Validation Layer Error:', error);
    return {
      ...rawData,
      confidenceScores: {
        personal: 50,
        skills: 50,
        experience: 50,
        education: 50,
        projects: 50,
        certifications: 50,
        links: 50
      }
    };
  }
}

function deduplicateArray(arr) {
  if (!Array.isArray(arr)) return [];
  const cleaned = arr.map(item => item.trim()).filter(Boolean);
  return [...new Set(cleaned)];
}

function calculatePersonalScore(data) {
  let score = 0;
  if (data.name && data.name !== 'Unknown Candidate') score += 40;
  if (data.email) score += 30;
  if (data.phone) score += 30;
  return score;
}

function calculateSkillsScore(skills) {
  if (!skills || skills.length === 0) return 0;
  // Bounded scale: 10 skills = 100%
  return Math.min(100, skills.length * 10);
}

function calculateExperienceScore(experience) {
  if (!experience || experience.length === 0) return 0;
  // Bounded scale: 3 jobs = 100%
  return Math.min(100, Math.round(experience.length * 33.3));
}

function calculateEducationScore(education) {
  if (!education || education.length === 0) return 0;
  // 1 education entry = 100% confidence
  return 100;
}

function calculateProjectsScore(projects) {
  if (!projects || projects.length === 0) return 0;
  // 2 projects = 100% confidence
  return Math.min(100, projects.length * 50);
}

function calculateCertificationsScore(certifications) {
  if (!certifications || certifications.length === 0) return 0;
  return 100;
}

function calculateLinksScore(links) {
  if (!links || links.length === 0) return 0;
  // 2 links = 100% confidence (e.g. GitHub & LinkedIn)
  return Math.min(100, links.length * 50);
}

module.exports = { validateAndScoreData };
