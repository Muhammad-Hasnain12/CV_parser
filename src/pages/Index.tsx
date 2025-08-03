import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { FeatureCard } from '@/components/FeatureCard';
import { ParsedResults } from '@/components/ParsedResults';
import { Header } from '@/components/Header';
import { User, FileText, Brain, Github, Mail, Shield, Sparkles, Zap, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ApiService, ParsedResumeData } from '@/services/api';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const { toast } = useToast();
  const parsedResultsRef = useRef<HTMLDivElement>(null);

  const checkBackendConnection = useCallback(async () => {
    try {
      const isConnected = await ApiService.checkHealth();
      setIsBackendConnected(isConnected);
      
      if (!isConnected) {
        toast({
          title: "Backend Connection",
          description: "Unable to connect to backend server. Using demo mode.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Backend connection check failed:', error);
      setIsBackendConnected(false);
    }
  }, [toast]);

  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection();
  }, [checkBackendConnection]);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setParsedData(null);
  };

  const handleParse = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    
    try {
      if (!isBackendConnected) {
        // Fallback to mock data if backend is not available
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockData: ParsedResumeData = {
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
          title: "Demo Mode",
          description: "Resume parsed successfully (using demo data)",
        });
      } else {
        // Use real backend API
        const response = await ApiService.parseResume(uploadedFile);
        
        if (response.success && response.data) {
          setParsedData(response.data);
          toast({
            title: "Success!",
            description: `Resume "${response.filename}" parsed successfully`,
          });
        } else {
          throw new Error(response.error || 'Failed to parse resume');
        }
      }

      // Automatically scroll to parsed results after a short delay
      setTimeout(() => {
        if (parsedResultsRef.current) {
          parsedResultsRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 500);

    } catch (error) {
      console.error('Parse error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to parse resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Backend Status Indicator */}
      {!isBackendConnected && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20">
          <div className="container mx-auto px-4 py-2">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 text-center">
              ⚠️ Running in demo mode - Backend server not connected
            </p>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Resume Parsing
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Extract Insights from
              <br />
              Your Resume
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload your resume and get instant extraction of key details including skills, experience, 
              education, and contact information with our advanced AI technology.
            </p>
          </div>

          {/* File Upload Section */}
          <div className="mb-20">
            <FileUpload 
              onFileUpload={handleFileUpload}
              onParse={handleParse}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose ParsePath?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our advanced AI technology provides accurate and comprehensive resume parsing
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={Zap}
              title="Lightning Fast"
              description="Get results in seconds with our optimized parsing engine"
            />
            <FeatureCard
              icon={Target}
              title="Highly Accurate"
              description="Advanced AI models ensure precise extraction of information"
            />
            <FeatureCard
              icon={Brain}
              title="Smart Analysis"
              description="Intelligent parsing that understands context and structure"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About ParsePath</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ParsePath is an AI-powered resume parser that helps you instantly extract key information from your CV, including skills, experience, education, and contact details. Built with modern web technologies and advanced AI (including Hugging Face and Affinda), ParsePath is designed for accuracy, speed, and ease of use.<br /><br />
              This project was created by Muhammad Hasnain, a Cyber Security student at FAST University Karachi, passionate about building smart tools for the future of work.<br /><br />
              Whether you’re a job seeker, recruiter, or developer, ParsePath makes resume data extraction effortless and reliable.
            </p>
          </div>
        </div>
      </section>

      {/* Parsed Results */}
      {(parsedData || isLoading) && (
        <section ref={parsedResultsRef} className="py-20">
          <div className="container mx-auto px-4">
            <ParsedResults data={parsedData} isLoading={isLoading} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded bg-gradient-primary"></div>
              <span className="text-lg font-semibold">ParsePath</span>
            </div>
            
            <div className="flex space-x-8">
              <a href="https://github.com/Muhammad-Hasnain12" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a href="mailto:hasnainmemon04@outlook.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Shield className="h-5 w-5" />
                <span>Privacy</span>
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ParsePath. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
