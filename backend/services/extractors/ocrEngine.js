const Tesseract = require('tesseract.js');

/**
 * Safely performs optical character recognition (OCR) on the file buffer
 * @param {Buffer} buffer - Raw file buffer
 * @returns {Promise<string>} - Extracted text content
 */
async function performOCR(buffer) {
  try {
    console.log('📷 Scanned document detected. Launching Tesseract OCR engine...');
    const result = await Tesseract.recognize(
      buffer,
      'eng',
      { 
        logger: m => console.log(`🔍 OCR progress: ${(m.progress * 100).toFixed(0)}% (${m.status})`)
      }
    );
    
    console.log('✅ OCR extraction completed successfully');
    return result.data.text || '';
  } catch (error) {
    console.error('💥 Tesseract OCR Error:', error);
    return ''; // Fail-safe fallback to prevent endpoint crash
  }
}

module.exports = { performOCR };
