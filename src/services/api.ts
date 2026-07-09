// Use relative URLs for better Vercel deployment compatibility
const API_BASE_URL = import.meta.env.PROD
  ? '/api'  // Use relative path for production (Vercel)
  : 'http://localhost:5000/api';  // Use local backend for development

import { ParsedResumeData, ApiResponse } from '@/types';


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
      const message = error instanceof Error ? error.message : 'Failed to connect to the parsing server';
      console.error('API Error parsing resume:', error);
      throw new Error(message);
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