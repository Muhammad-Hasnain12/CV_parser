import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Star, 
  Link, 
  Github, 
  Linkedin,
  Sparkles,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

interface ParsedData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  certifications?: string[];
  projects?: string[];
  links?: string[];
}

interface ParsedResultsProps {
  data: ParsedData | null;
  isLoading: boolean;
}

export const ParsedResults: React.FC<ParsedResultsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="p-12 bg-card/80 backdrop-blur-sm border border-border/50 shadow-2xl rounded-3xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              Processing Resume
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Analyzing Your Resume</h2>
            <p className="text-lg text-muted-foreground">Our AI is extracting key information...</p>
          </div>
          
          <div className="space-y-8">
            {/* Animated skeleton loaders */}
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-muted/30 animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="h-6 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-muted/30 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-3 text-primary">
            <LoadingSpinner size="lg" />
            <span className="text-lg font-medium">Extracting information...</span>
          </div>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-12 bg-card/80 backdrop-blur-sm border border-border/50 shadow-2xl rounded-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-6 py-3 text-sm font-medium text-primary mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Parsing Complete
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">Extracted Information</h2>
          <p className="text-lg text-muted-foreground">Here's what we found in your resume</p>
        </div>
        
        <div className="space-y-12">
          {/* Personal Information */}
          {(data.name || data.email || data.phone) && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Personal Information</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {data.name && (
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="h-5 w-5 text-primary" />
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                    </div>
                    <p className="text-xl font-bold text-foreground">{data.name}</p>
                  </div>
                )}
                {data.email && (
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                    </div>
                    <p className="text-xl font-bold text-foreground break-all">{data.email}</p>
                  </div>
                )}
                {data.phone && (
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 hover:border-primary/40 transition-colors">
                    <div className="flex items-center space-x-3 mb-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    </div>
                    <p className="text-xl font-bold text-foreground">{data.phone}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Skills & Expertise</h3>
              </div>
              <div className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20">
                <div className="flex flex-wrap gap-3">
                  {data.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-sm px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Work Experience</h3>
              </div>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-card/50 to-card/80 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-foreground">{exp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
              </div>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-card/50 to-card/80 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-foreground">{edu}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Certifications</h3>
              </div>
              <div className="space-y-4">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-card/50 to-card/80 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-foreground">{cert}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Projects</h3>
              </div>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="p-6 bg-gradient-to-br from-card/50 to-card/80 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-foreground">{project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {data.links && data.links.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Link className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Social Links</h3>
              </div>
              <div className="flex flex-wrap gap-4">
                {data.links.map((link, index) => {
                  const isGithub = link.includes('github.com');
                  const isLinkedin = link.includes('linkedin.com');
                  const Icon = isGithub ? Github : isLinkedin ? Linkedin : ExternalLink;
                  
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">
                        {isGithub ? 'GitHub' : isLinkedin ? 'LinkedIn' : 'Website'}
                      </span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};