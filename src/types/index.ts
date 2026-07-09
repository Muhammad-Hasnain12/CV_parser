export interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  certifications?: string[];
  projects?: string[];
  links?: string[];
  confidenceScores?: {
    personal?: number;
    skills?: number;
    experience?: number;
    education?: number;
    projects?: number;
    certifications?: number;
    links?: number;
  };
}

export interface ApiResponse {
  success: boolean;
  data?: ParsedResumeData;
  error?: string;
  filename?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}
