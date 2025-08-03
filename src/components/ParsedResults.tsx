import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { User, Mail, Phone, Briefcase, GraduationCap, Star } from 'lucide-react';

interface ParsedData {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
}

interface ParsedResultsProps {
  data: ParsedData | null;
  isLoading: boolean;
}

export const ParsedResults: React.FC<ParsedResultsProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="p-8 bg-card border-border shadow-lg">
        <div className="text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/3 mx-auto"></div>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-2 text-muted-foreground">
            <LoadingSpinner size="sm" />
            <span>Analyzing your resume...</span>
          </div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="p-8 bg-card border-border shadow-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
          <Star className="h-4 w-4 mr-2" />
          Parsing Complete
        </div>
        <h2 className="text-3xl font-bold text-foreground">Extracted Information</h2>
        <p className="text-muted-foreground mt-2">Here's what we found in your resume</p>
      </div>
      
      <div className="space-y-8">
        {/* Personal Information */}
        {(data.name || data.email || data.phone) && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {data.name && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-semibold text-foreground">{data.name}</p>
                </div>
              )}
              {data.email && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    Email
                  </p>
                  <p className="font-semibold text-foreground">{data.email}</p>
                </div>
              )}
              {data.phone && (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    Phone
                  </p>
                  <p className="font-semibold text-foreground">{data.phone}</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <Star className="h-5 w-5 mr-2 text-primary" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary" />
              Work Experience
            </h3>
            <div className="space-y-3">
              {data.experience.map((exp, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary/20">
                  <p className="text-foreground">{exp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary" />
              Education
            </h3>
            <div className="space-y-3">
              {data.education.map((edu, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary/20">
                  <p className="text-foreground">{edu}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};