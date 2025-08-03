const multer = require('multer');
const { parseResume } = require('../backend/services/aiResumeParser');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'), false);
    }
  }
});

// Vercel serverless function
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Use multer to handle file upload
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({
          success: false,
          error: err.message || 'File upload error'
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      const { originalname, mimetype, buffer } = req.file;
      
      console.log(`Processing file: ${originalname} (${mimetype})`);
      console.log(`File size: ${buffer.length} bytes`);

      // Parse the resume
      const parsedData = await parseResume(buffer, originalname, mimetype);
      console.log('Parsing completed successfully');

      res.json({
        success: true,
        data: parsedData,
        filename: originalname
      });
    });

  } catch (error) {
    console.error('Error parsing resume:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to parse resume'
    });
  }
}; 