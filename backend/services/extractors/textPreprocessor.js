/**
 * Preprocesses and normalizes raw text extracted from documents
 * @param {string} text - Raw extracted text
 * @returns {string} - Cleaned and normalized text
 */
function preprocessText(text) {
  if (!text) return '';
  
  let cleaned = text
    // Replace bullet symbols with standard separators
    .replace(/[•●▪◦■□◆◇]/g, '-')
    // Normalize soft hyphens
    .replace(/\u00ad/g, '-')
    // Clean up carriage returns
    .replace(/\r\n/g, '\n')
    // Remove unusual control/Unicode characters but keep line endings
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ')
    // Replace multiple spaces with a single space
    .replace(/[ \t]+/g, ' ')
    // Standardize vertical white spacing to avoid extra blank lines
    .replace(/\n\s*\n+/g, '\n');

  // Break text into lines, trim, and filter blank lines
  const lines = cleaned.split('\n')
    .map(line => line.trim())
    .filter(Boolean);
    
  return lines.join('\n');
}

module.exports = { preprocessText };
