# ParsePath Backend

A Node.js/Express backend service for parsing resumes and extracting key information using AI and NLP techniques.

## 🚀 Features

- **📄 Multi-format Support**: PDF, DOCX, and TXT files
- **🤖 AI-Powered Parsing**: Advanced NLP for accurate information extraction
- **🔒 Secure**: Rate limiting, CORS protection, and input validation
- **⚡ Fast**: Optimized parsing with caching
- **📊 Structured Output**: Clean JSON responses with extracted data

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **File Processing**: 
  - `pdf-parse` for PDF files
  - `mammoth` for DOCX files
- **NLP**: 
  - `natural` for text processing
  - `compromise` for advanced NLP
- **Security**: `helmet`, `express-rate-limit`
- **File Upload**: `multer`

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```env
PORT=5000
FRONTEND_URL=http://localhost:8081
NODE_ENV=development
```

### 3. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "ParsePath API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Parse Resume
```
POST /api/parse-resume
```

**Request:**
- Content-Type: `multipart/form-data`
- Body: `resume` (file)

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone": "(555) 123-4567",
    "skills": ["JavaScript", "React", "Node.js"],
    "experience": [
      "Senior Developer at TechCorp (2020-2023)"
    ],
    "education": [
      "Bachelor of Science in Computer Science - University (2016)"
    ]
  },
  "filename": "resume.pdf"
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8081` |
| `NODE_ENV` | Environment mode | `development` |

### Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 100 per IP
- **Message**: "Too many requests from this IP, please try again later."

### File Upload Limits

- **Max File Size**: 10MB
- **Allowed Types**: PDF, DOCX, TXT

## 🧠 Parsing Capabilities

### Extracted Information

1. **Personal Information**
   - Name (from first lines or filename)
   - Email address
   - Phone number

2. **Skills**
   - Technical skills (programming languages, tools, frameworks)
   - Soft skills
   - NLP-based skill detection

3. **Work Experience**
   - Job titles
   - Company names
   - Dates and durations
   - Responsibilities

4. **Education**
   - Degrees and certifications
   - Institutions
   - Graduation years

### Supported File Formats

- **PDF**: Using `pdf-parse` library
- **DOCX**: Using `mammoth` library
- **TXT**: Direct text processing

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **File Validation**: Type and size checks
- **Input Sanitization**: Clean user inputs

## 🧪 Testing

```bash
npm test
```

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── services/
│   └── resumeParser.js    # Resume parsing logic
├── package.json           # Dependencies
├── config.env             # Environment variables
└── README.md             # This file
```

## 🚀 Deployment

### Production Setup

1. Set `NODE_ENV=production`
2. Configure proper CORS origins
3. Set up environment variables
4. Use a process manager like PM2

```bash
npm install -g pm2
pm2 start server.js --name "parsepath-backend"
```

### Docker (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Change PORT in .env file
   PORT=5001
   ```

2. **CORS errors**
   - Check `FRONTEND_URL` in `.env`
   - Ensure frontend is running on correct port

3. **File upload fails**
   - Check file size (max 10MB)
   - Verify file type (PDF, DOCX, TXT only)

4. **Parsing errors**
   - Check file is not corrupted
   - Ensure file contains readable text
   - Try with different file format

### Logs

Enable debug logging by setting:
```env
NODE_ENV=development
DEBUG=parsepath:*
``` 