import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse multipart form data with size constraints and parameters
async function parseForm(req) {
  const busboy = (await import("busboy")).default;
  return new Promise((resolve, reject) => {
    let bb;
    try {
      bb = busboy({ 
        headers: req.headers,
        limits: {
          fileSize: 10 * 1024 * 1024, // 10MB limit
          files: 1
        }
      });
    } catch (e) {
      return reject(e);
    }

    let fileBuffer = Buffer.alloc(0);
    let fileInfo = {};
    let sizeLimitExceeded = false;
    let fileRegistered = false;

    bb.on("file", (name, file, info) => {
      fileRegistered = true;
      fileInfo = info;
      file.on("data", (data) => {
        fileBuffer = Buffer.concat([fileBuffer, data]);
      });
      file.on("limit", () => {
        sizeLimitExceeded = true;
      });
    });

    bb.on("finish", () => {
      if (!fileRegistered) {
        return reject(new Error("No file found in the request."));
      }
      if (sizeLimitExceeded) {
        return reject(new Error("File too large. Maximum size is 10MB."));
      }
      resolve({ buffer: fileBuffer, ...fileInfo });
    });

    bb.on("error", reject);
    req.pipe(bb);
  });
}

const ALLOWED_MIMETYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

export default async function handler(req, res) {
  // CORS setup
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { buffer, filename, mimeType } = await parseForm(req);
    
    if (!buffer || buffer.length === 0 || !filename || !mimeType) {
      return res.status(400).json({ success: false, error: "Invalid upload request parameters." });
    }

    // Validate MIME types
    if (!ALLOWED_MIMETYPES.includes(mimeType)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid file type. Only PDF, DOCX, and TXT files are allowed." 
      });
    }

    // Sanitize filename to prevent directory traversal or script injection
    const sanitizedFilename = path.basename(filename).replace(/[^a-zA-Z0-9_.-]/g, "_");

    // Dynamically import the parsing engine
    const parser = await import("../backend/services/aiResumeParser.js");
    const parseResume = parser.parseResume || (parser.default && parser.default.parseResume);
    if (!parseResume) {
      throw new Error("Parser service export not resolved");
    }
    const parsedData = await parseResume(buffer, sanitizedFilename, mimeType);

    res.status(200).json({
      success: true,
      data: parsedData,
      filename: sanitizedFilename,
    });
  } catch (error) {
    console.error("Error in serverless resume parser:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to parse resume",
    });
  }
}