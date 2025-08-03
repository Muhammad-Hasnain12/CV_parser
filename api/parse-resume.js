export const config = {
  api: {
    bodyParser: false,
  },
};

import { Readable } from "stream";

// Helper to parse multipart form data
async function parseForm(req) {
  const busboy = (await import("busboy")).default;
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    let fileBuffer = Buffer.alloc(0);
    let fileInfo = {};
    bb.on("file", (name, file, info) => {
      fileInfo = info;
      file.on("data", (data) => {
        fileBuffer = Buffer.concat([fileBuffer, data]);
      });
    });
    bb.on("finish", () => {
      resolve({ buffer: fileBuffer, ...fileInfo });
    });
    bb.on("error", reject);
    req.pipe(bb);
  });
}

export default async function handler(req, res) {
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
    if (!buffer || !filename || !mimeType) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    // Dynamically import your parser
    const { parseResume } = await import("../backend/services/aiResumeParser.js");
    const parsedData = await parseResume(buffer, filename, mimeType);

    res.status(200).json({
      success: true,
      data: parsedData,
      filename,
    });
  } catch (error) {
    console.error("Error parsing resume:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to parse resume",
    });
  }
} 