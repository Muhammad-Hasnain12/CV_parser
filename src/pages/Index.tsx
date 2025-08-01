import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { FeatureCard } from '@/components/FeatureCard';
import { ParsedResults } from '@/components/ParsedResults';
import { User, FileText, Brain, Github, Mail, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ParsedData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
}

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setParsedData(null);
  };

  const handleParse = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    
    // Simulate API call with mock data for demo
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock parsed data based on filename for demo
      const mockData: ParsedData = {
        name: "John Doe",
        email: "johndoe@email.com",
        phone: "+1 (555) 123-4567",
        skills: ["Python", "Data Analysis", "Machine Learning", "React", "JavaScript"],
        experience: [
          "Senior Data Scientist at TechCorp (2020-2023)",
          "Data Analyst at StartupXYZ (2018-2020)",
          "Junior Developer at WebSolutions (2016-2018)"
        ],
        education: [
          "Master of Science in Computer Science - Stanford University (2016)",
          "Bachelor of Science in Mathematics - UCLA (2014)"
        ]
      };
      
      setParsedData(mockData);
      toast({
        title: "Success!",
        description: "Resume parsed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Upload Your Resume for Parsing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get instant extraction of key details from your CV
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-16">
          <FileUpload 
            onFileUpload={handleFileUpload}
            onParse={handleParse}
            isLoading={isLoading}
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={User}
            title="Extract Name, Skills, Experience"
            description="PDF/DOCX Support"
          />
          <FeatureCard
            icon={FileText}
            title="PDF/DOCX Support"
            description="AI Suggestions"
          />
          <FeatureCard
            icon={Brain}
            title="AI Suggestions"
            description="Smart extraction using advanced AI models"
          />
        </div>

        {/* Parsed Results */}
        {(parsedData || isLoading) && (
          <div className="mb-16">
            <ParsedResults data={parsedData} isLoading={isLoading} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
              <span>Github</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
              <span>Contact</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Shield className="h-5 w-5" />
              <span>Privacy</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
