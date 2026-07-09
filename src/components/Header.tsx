import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Github, Mail, Sparkles, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
          <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center text-background font-bold text-xs select-none">
            P
          </div>
          <span className="text-sm font-semibold tracking-tight text-foreground">
            ParsePath
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handleNavClick('features-section')}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            About
          </button>
          <Link 
            to="/contact" 
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <a
            href="https://github.com/Muhammad-Hasnain12"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center text-xs font-medium border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground h-8 px-3 rounded-md transition-colors"
          >
            <Github className="h-3.5 w-3.5 mr-1.5" />
            GitHub
          </a>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 space-y-2">
            <button 
              onClick={() => handleNavClick('features-section')}
              className="flex items-center space-x-2.5 w-full py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Features</span>
            </button>
            <button 
              onClick={() => handleNavClick('about')}
              className="flex items-center space-x-2.5 w-full py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
              <span>About</span>
            </button>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2.5 w-full py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Contact</span>
            </Link>
            <a
              href="https://github.com/Muhammad-Hasnain12"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2.5 w-full py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5 text-muted-foreground" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};