import React from 'react';
import { Header } from '@/components/Header';
import { 
  Code, 
  Copy, 
  Check, 
  Star, 
  ArrowRight,
  Terminal,
  FileText,
  Zap,
  Shield,
  Globe,
  Users
} from 'lucide-react';

const API = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-medium text-primary mb-8">
              <Code className="h-4 w-4 mr-2" />
              API Documentation
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
              ParsePath API
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                for Developers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Integrate AI-powered resume parsing into your applications with our comprehensive REST API
            </p>
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              API Overview
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple, powerful, and secure API for resume parsing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">RESTful API</h3>
              <p className="text-muted-foreground">Standard HTTP methods with JSON responses for easy integration</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
              <p className="text-muted-foreground">API key-based authentication with HTTPS encryption</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global CDN</h3>
              <p className="text-muted-foreground">Fast response times worldwide with our global infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Quick Start
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with ParsePath API in minutes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4">1. Get Your API Key</h3>
              <p className="text-muted-foreground mb-4">Sign up for a Pro or Enterprise plan to get your API key.</p>
              <div className="bg-muted p-4 rounded-lg">
                <code className="text-sm">API_KEY=your_api_key_here</code>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4">2. Make Your First Request</h3>
              <p className="text-muted-foreground mb-4">Upload a resume file and get parsed data in JSON format.</p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.parsepath.com/v1/parse \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@resume.pdf"`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4">3. Handle the Response</h3>
              <p className="text-muted-foreground mb-4">Process the structured data returned by the API.</p>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "skills": ["Python", "JavaScript", "React"],
    "experience": ["Senior Developer at TechCorp"],
    "education": ["BS Computer Science, Stanford"]
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Code Examples
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Integration examples in popular programming languages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                JavaScript/Node.js
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`const FormData = require('form-data');
const fs = require('fs');

const form = new FormData();
form.append('file', fs.createReadStream('resume.pdf'));

fetch('https://api.parsepath.com/v1/parse', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: form
})
.then(response => response.json())
.then(data => console.log(data));`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                Python
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`import requests

url = 'https://api.parsepath.com/v1/parse'
headers = {'Authorization': 'Bearer YOUR_API_KEY'}

with open('resume.pdf', 'rb') as f:
    files = {'file': f}
    response = requests.post(url, headers=headers, files=files)
    data = response.json()
    print(data)`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                PHP
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`$url = 'https://api.parsepath.com/v1/parse';
$headers = ['Authorization: Bearer YOUR_API_KEY'];

$data = [
    'file' => new CURLFile('resume.pdf')
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
curl_close($ch);`}
                </pre>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Terminal className="h-5 w-5 mr-2" />
                cURL
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.parsepath.com/v1/parse \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@resume.pdf" \\
  -H "Content-Type: multipart/form-data"`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              API Endpoints
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete reference for all available API endpoints
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded text-sm font-semibold">POST</span>
                <code className="text-lg font-mono">/v1/parse</code>
              </div>
              <p className="text-muted-foreground mb-4">Parse a resume file and extract structured data</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Parameters:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><code>file</code> - Resume file (PDF, DOCX, TXT)</li>
                    <li><code>language</code> - Language code (optional, defaults to 'en')</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Response:</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`{
  "success": true,
  "data": {
    "name": "string",
    "email": "string", 
    "phone": "string",
    "skills": ["string"],
    "experience": ["string"],
    "education": ["string"]
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-card border border-border/50">
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">GET</span>
                <code className="text-lg font-mono">/v1/health</code>
              </div>
              <p className="text-muted-foreground mb-4">Check API service status</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Response:</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
{`{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Ready to Integrate?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get your API key and start building with ParsePath today
            </p>
            <a 
              href="/pricing" 
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <span>Get API Key</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default API; 