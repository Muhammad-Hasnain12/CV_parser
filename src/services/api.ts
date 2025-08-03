const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://cv-parser-2lpgads3s-muhammad-hasnains-projects-70797c00.vercel.app/api'
  : 'http://localhost:5000/api';

export interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
}

export interface ApiResponse {
  success: boolean;
  data?: ParsedResumeData;
  error?: string;
  filename?: string;
}

export class ApiService {
  static async parseResume(file: File): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${API_BASE_URL}/parse-resume`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to parse resume');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
} 