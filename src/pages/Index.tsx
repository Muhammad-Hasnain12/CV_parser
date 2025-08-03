import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { FeatureCard } from '@/components/FeatureCard';
import { ParsedResults } from '@/components/ParsedResults';
import { Header } from '@/components/Header';
import { 
  User, 
  FileText, 
  Brain, 
  Github, 
  Mail, 
  Shield, 
  Sparkles, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
  Lock,
  Download,
  Upload as UploadIcon,
  Play,
  Award,
  Users,
  Clock
} from 'lucide-react';
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
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-b border-yellow-500/20">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-400">
              <div className="animate-pulse">
                <Sparkles className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium">
                Running in demo mode - Backend server not connected
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary/5 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-medium text-primary mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              AI-Powered Resume Parsing
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight animate-fade-in-up">
              Extract Insights
              <br />
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                from Your Resume
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in-up delay-200">
              Upload your resume and get instant extraction of key details including skills, experience, 
              education, and contact information with our advanced AI technology.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center space-x-8 mb-12 animate-fade-in-up delay-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">70-80%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2s</div>
                <div className="text-sm text-muted-foreground">Average Time</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Resumes Parsed</div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="mb-20 animate-fade-in-up delay-400">
            <FileUpload 
              onFileUpload={handleFileUpload}
              onParse={handleParse}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Star className="h-4 w-4 mr-2" />
              Why Choose ParsePath?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Advanced AI Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our cutting-edge AI provides accurate and comprehensive resume parsing with lightning-fast results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">Get results in seconds with our optimized parsing engine</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Highly Accurate</h3>
              <p className="text-muted-foreground">Advanced AI models ensure precise extraction of information</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Analysis</h3>
              <p className="text-muted-foreground">Intelligent parsing that understands context and structure</p>
            </div>
            
            <div className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">Your data is processed securely and never stored</p>
            </div>
          </div>
          
          {/* Additional features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <div className="p-4 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FileText className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Formats</h3>
              <p className="text-muted-foreground">Support for PDF, DOCX, and TXT files</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <div className="p-4 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cloud-Based</h3>
              <p className="text-muted-foreground">Access from anywhere, no installation required</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
              <div className="p-4 bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free to Use</h3>
              <p className="text-muted-foreground">No registration required, completely free</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple three-step process to extract insights from your resume
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="p-6 bg-primary/10 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <UploadIcon className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Resume</h3>
              <p className="text-muted-foreground">Drag and drop your resume file or click to browse</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="p-6 bg-primary/10 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Brain className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
              <p className="text-muted-foreground">Our AI analyzes and extracts key information</p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="p-6 bg-primary/10 rounded-2xl w-24 h-24 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-muted-foreground">View extracted information in a clean, organized format</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
                <Award className="h-4 w-4 mr-2" />
                About ParsePath
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Built for the Future
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  ParsePath is an AI-powered resume parser that helps you instantly extract key information from your CV, including skills, experience, education, and contact details. Built with modern web technologies and advanced AI (including Hugging Face and Affinda), ParsePath is designed for accuracy, speed, and ease of use.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This project was created by Muhammad Hasnain, a Cyber Security student at FAST University Karachi, passionate about building smart tools for the future of work.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're a job seeker, recruiter, or developer, ParsePath makes resume data extraction effortless and reliable.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Advanced AI</h3>
                  </div>
                  <p className="text-muted-foreground">State-of-the-art machine learning models for accurate parsing</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                  </div>
                  <p className="text-muted-foreground">Get results in seconds with optimized processing</p>
                </div>
                
                <div className="p-6 rounded-2xl bg-card border border-border/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Privacy First</h3>
                  </div>
                  <p className="text-muted-foreground">Your data is processed securely and never stored</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parsed Results */}
      {(parsedData || isLoading) && (
        <section ref={parsedResultsRef} className="py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <ParsedResults data={parsedData} isLoading={isLoading} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary"></div>
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ParsePath
                </span>
              </div>
              <p className="text-muted-foreground">
                AI-powered resume parsing for the modern world.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="/features" className="block text-muted-foreground hover:text-primary transition-colors">Features</a>
                <a href="/pricing" className="block text-muted-foreground hover:text-primary transition-colors">Pricing</a>
                <a href="/api" className="block text-muted-foreground hover:text-primary transition-colors">API</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">About</a>
                <a href="/blog" className="block text-muted-foreground hover:text-primary transition-colors">Blog</a>
                <a href="/careers" className="block text-muted-foreground hover:text-primary transition-colors">Careers</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="/help" className="block text-muted-foreground hover:text-primary transition-colors">Help Center</a>
                <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
                <a href="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">Privacy</a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2024 ParsePath. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              <a href="https://github.com/Muhammad-Hasnain12" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a href="mailto:hasnainmemon04@outlook.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
                <span>Contact</span>
              </a>
                             <a href="/privacy" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                 <Shield className="h-5 w-5" />
                 <span>Privacy</span>
               </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
