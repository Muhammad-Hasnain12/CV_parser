import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Github, Mail, Shield, Sparkles, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-sm opacity-50"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ParsePath
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={scrollToFeatures}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer relative group"
          >
            Features
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
          </button>
          <button 
            onClick={scrollToAbout}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer relative group"
          >
            About
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
          </button>
        </nav>
        
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          
          <a
            href="https://github.com/Muhammad-Hasnain12"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center border border-border/50 rounded-xl px-4 py-2 text-sm font-medium hover:text-primary hover:border-primary/50 transition-all duration-300 hover:shadow-md"
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </a>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <div className="container py-4 space-y-4">
            <button 
              onClick={scrollToFeatures}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Features</span>
            </button>
            <button 
              onClick={scrollToAbout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              <Shield className="h-4 w-4" />
              <span>About</span>
            </button>
            <a
              href="https://github.com/Muhammad-Hasnain12"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:hasnainmemon04@outlook.com"
              className="flex items-center space-x-3 w-full px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}; 