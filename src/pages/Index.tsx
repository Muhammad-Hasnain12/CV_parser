import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FileUpload } from '@/components/FileUpload';
import { ParsedResults } from '@/components/ParsedResults';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ApiService } from '@/services/api';
import { ParsedResumeData } from '@/types';
import { 
  LayoutGrid, 
  FileText, 
  History, 
  FileDown, 
  Settings, 
  Layers, 
  FileCode, 
  User, 
  Key, 
  BarChart3, 
  Crown, 
  ChevronDown, 
  Menu, 
  X, 
  ChevronsLeft, 
  Sparkles,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  const parsedResultsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const checkBackendConnection = useCallback(async () => {
    try {
      const isConnected = await ApiService.checkHealth();
      setIsBackendConnected(isConnected);
      
      if (!isConnected) {
        toast({
          title: "Demo Mode Active",
          description: "Unable to connect to parsing server. Using demo mode.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Backend connection check failed:', error);
      setIsBackendConnected(false);
    } finally {
      setIsCheckingBackend(false);
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
          email: "johndoe@example.com",
          phone: "+1 (555) 123-4567",
          skills: ["JavaScript", "TypeScript", "React", "Node.js", "Express.js", "Next.js", "MongoDB", "PostgreSQL", "Tailwind CSS", "AWS", "Docker", "Git", "CI/CD", "REST APIs"],
          experience: [
            "Senior Full Stack Developer (2021 - Present)\nTech Solutions Inc.\nBuilding scalable web applications using React, Node.js, and cloud technologies. Leading a team of 4 developers and managing project delivery.",
            "Full Stack Developer (2019 - 2021)\nWeb Developers LLC.\nDeveloped and maintained multiple client projects using MERN stack. Collaborated with designers and product managers.",
            "Frontend Developer (2018 - 2019)\nDigital Agency\nBuilt responsive user interfaces and improved application performance."
          ],
          education: [
            "Bachelor of Computer Science (2014 - 2018)\nUniversity of New York\nGraduated with honors"
          ],
          certifications: [
            "AWS Certified Developer – Associate",
            "MongoDB Certified Developer",
            "React Developer Certification"
          ],
          projects: [
            "E-Commerce Platform - A full-stack e-commerce solution with React, Node.js, and MongoDB.",
            "Task Management App - A collaborative task management application with real-time updates."
          ],
          links: [
            "https://linkedin.com",
            "https://github.com",
            "https://portfolio.com"
          ]
        };
        
        setParsedData(mockData);
        toast({
          title: "Demo Parsing Success",
          description: "Resume parsed successfully using sample demo profile.",
        });
      } else {
        // Use real backend API
        const response = await ApiService.parseResume(uploadedFile);
        
        if (response.success && response.data) {
          setParsedData(response.data);
          toast({
            title: "Parsing Success",
            description: `File "${response.filename}" parsed successfully.`,
          });
        } else {
          throw new Error(response.error || 'Failed to parse resume');
        }
      }

    } catch (error) {
      console.error('Parse error:', error);
      toast({
        title: "Parsing Failed",
        description: error instanceof Error ? error.message : "Failed to parse document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-400 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-0 max-md:-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="flex flex-col flex-1">
          {/* Header Branding */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60 flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
              <div className="h-7 w-7 rounded bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm select-none shadow-md shadow-indigo-600/20">
                P
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                ParsePath
              </span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-slate-500 hover:text-slate-300 transition-colors"
            >
              <ChevronsLeft className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
            {/* Core Nav list */}
            <div className="space-y-1.5">
              <Link 
                to="/" 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-600/10 text-white font-medium text-xs transition-colors"
              >
                <LayoutGrid className="h-4 w-4 text-[#6366f1]" />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={() => {
                  setUploadedFile(null);
                  setParsedData(null);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs text-left transition-colors cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                <span>Parse Resume</span>
              </button>
              <Link 
                to="/pricing" 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </Link>
              <Link 
                to="/features" 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
              >
                <FileDown className="h-4 w-4" />
                <span>Exported Files</span>
              </Link>
              <Link 
                to="/privacy" 
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Tools list */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider px-3 block">
                Tools
              </span>
              <div className="space-y-1">
                <Link 
                  to="/features" 
                  className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
                >
                  <Layers className="h-4 w-4" />
                  <span>Bulk Parse</span>
                </Link>
                <Link 
                  to="/help" 
                  className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
                >
                  <FileCode className="h-4 w-4" />
                  <span>Templates</span>
                </Link>
              </div>
            </div>

            {/* Account list */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider px-3 block">
                Account
              </span>
              <div className="space-y-1">
                <Link 
                  to="/contact" 
                  className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
                >
                  <Key className="h-4 w-4" />
                  <span>API Keys</span>
                </Link>
                <Link 
                  to="/pricing" 
                  className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 font-medium text-xs transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Usage</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Pro Widget Card */}
        <div className="px-4 py-4 border-t border-slate-800/50 flex-shrink-0">
          <Card className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl text-left space-y-3.5 shadow-md">
            <div className="flex items-center space-x-2 text-[#fbbf24]">
              <Crown className="h-4 w-4 fill-current" />
              <h4 className="text-xs font-bold text-white">Upgrade to Pro</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Unlock advanced batch processing capabilities and increased thresholds.
            </p>
            <Link 
              to="/pricing" 
              className="w-full inline-flex items-center justify-center text-xs font-semibold text-white bg-[#4f46e5] hover:bg-[#4f46e5]/90 h-8 rounded-md transition-colors"
            >
              Upgrade Now
            </Link>
          </Card>
        </div>

        {/* Profile Card Footer */}
        <div className="h-16 border-t border-slate-800/60 flex items-center justify-between px-4 text-left flex-shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow select-none flex-shrink-0">
              JD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">John Doe</p>
              <p className="text-[10px] text-slate-500 truncate">johndoe@email.com</p>
            </div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
        </div>
      </aside>

      {/* Sidebar mobile wrapper overlay */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* 2. MAIN LAYOUT PANEL */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Header Panel */}
        <header className="h-16 border-b border-slate-200/80 bg-white flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8 text-slate-500"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-4.5 w-4.5" />
            </Button>
            <div className="text-left">
              <h2 className="text-sm font-semibold text-slate-800">Resume Parser</h2>
              <p className="text-[10px] text-slate-400">Upload a resume and extract structured information instantly</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3.5">
            <ThemeToggle />
            <div className="h-px w-4 bg-slate-200"></div>
            <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-semibold flex items-center justify-center text-xs select-none shadow-sm">
              JD
            </div>
          </div>
        </header>

        {/* Inner Content Grid */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-6xl w-full mx-auto">
          {/* Demo status alert */}
          {!isCheckingBackend && !isBackendConnected && (
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg py-2.5 px-4 text-left flex items-start space-x-2">
              <ShieldAlert className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 leading-normal">
                Demo Mode Active: Server is currently offline. Mock parser results will be used for testing.
              </p>
            </div>
          )}

          {/* Core Split Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Content Area: Upload zone */}
            <div className="lg:col-span-4">
              <FileUpload 
                onFileUpload={handleFileUpload}
                onParse={handleParse}
                isLoading={isLoading}
              />
            </div>

            {/* Right Content Area: Tabs + Parsed Results card or Empty placeholder */}
            <div className="lg:col-span-8">
              {parsedData || isLoading ? (
                <div ref={parsedResultsRef} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <ParsedResults data={parsedData} isLoading={isLoading} />
                </div>
              ) : (
                <Card className="border border-slate-200 border-dashed bg-white/40 p-16 rounded-xl flex flex-col items-center justify-center text-center space-y-4 shadow-sm min-h-[300px]">
                  <div className="h-12 w-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 shadow-sm">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-xs font-semibold text-slate-800">No Resume Parsed Yet</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Upload a candidate resume on the left pane and click "Parse Resume" to display structured information matrices.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </main>

        {/* Global Footer */}
        <footer className="h-14 border-t border-slate-200/80 bg-white flex items-center justify-between px-6 text-slate-400 text-[10px] font-medium">
          <span>ParsePath v1.0.0 – AI-Powered Resume Parser</span>
          <span>Made with ❤️ by ParsePath</span>
        </footer>
      </div>
    </div>
  );
};

export default Index;
