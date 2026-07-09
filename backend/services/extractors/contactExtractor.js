/**
 * Extracts candidate contact information handles and phone formats
 * @param {string} text - Cleaned resume text
 * @returns {object} - Discovered email, phone, and links
 */
function extractContactInfo(text) {
  try {
    return {
      email: extractEmail(text),
      phone: extractPhone(text),
      links: extractSocialLinks(text)
    };
  } catch (error) {
    console.error('Contact extraction module error:', error);
    return { email: null, phone: null, links: [] };
  }
}

function extractEmail(text) {
  // Bounded and precise standard email address matcher
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  
  if (emails && emails.length > 0) {
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    // Prefer personal professional mailboxes if multiple exist
    const preferred = emails.find(email => 
      domains.some(domain => email.toLowerCase().includes(domain))
    );
    return preferred || emails[0];
  }
  return null;
}

function extractPhone(text) {
  // Support international formatting, country codes, dashes, periods
  const phonePatterns = [
    // Standard US/International formats (e.g., +1-555-123-4567, +92 300 1234567, 555-123-4567)
    /(?:\+\d{1,3}[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g,
    /(?:\+\d{1,3}[-.\s]?)?[0-9]{2,4}[-.\s]?[0-9]{3,4}[-.\s]?[0-9]{3,4}\b/g
  ];

  for (let pattern of phonePatterns) {
    const phones = text.match(pattern);
    if (phones && phones.length > 0) {
      return phones[0].trim();
    }
  }
  return null;
}

function extractSocialLinks(text) {
  const links = [];
  
  // GitHub regex
  const githubRegex = /(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+/gi;
  const githubLinks = text.match(githubRegex);
  if (githubLinks) {
    links.push(...githubLinks.map(link => normalizeUrl(link)));
  }
  
  // LinkedIn regex
  const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+/gi;
  const linkedinLinks = text.match(linkedinRegex);
  if (linkedinLinks) {
    links.push(...linkedinLinks.map(link => normalizeUrl(link)));
  }

  // Personal website/portfolio regex
  const portfolioRegex = /(https?:\/\/)?(www\.)?[A-Za-z0-9_-]+\.(com|org|net|io|me|dev|ai)(?:\/[A-Za-z0-9_-]+)*\b/gi;
  const portfolioLinks = text.match(portfolioRegex);
  if (portfolioLinks) {
    const excludedDomains = ['github.com', 'linkedin.com', 'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
    const filtered = portfolioLinks.filter(link => 
      !excludedDomains.some(domain => link.toLowerCase().includes(domain))
    );
    links.push(...filtered.map(link => normalizeUrl(link)));
  }
  
  return [...new Set(links)];
}

function normalizeUrl(url) {
  let cleaned = url.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    if (/^www\./i.test(cleaned)) {
      cleaned = `https://${cleaned}`;
    } else {
      cleaned = `https://www.${cleaned}`;
    }
  }
  return cleaned;
}

module.exports = { extractContactInfo };
