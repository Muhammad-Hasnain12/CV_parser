import React from 'react';
import { Card } from '@/components/ui/card';

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
      <Card className="p-8 bg-feature-bg border-border">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-2/3 mx-auto"></div>
          </div>
          <p className="text-muted-foreground mt-4">Parsing your resume...</p>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="p-8 bg-feature-bg border-border">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Parsed Output</h2>
      
      <div className="space-y-6">
        {data.name && (
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">{data.name}</h3>
          </div>
        )}
        
        {data.email && (
          <div>
            <p className="text-muted-foreground">{data.email}</p>
          </div>
        )}
        
        {data.phone && (
          <div>
            <p className="text-muted-foreground">{data.phone}</p>
          </div>
        )}
        
        {data.skills && data.skills.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Skills</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.skills.map((skill, index) => (
                <li key={index} className="text-muted-foreground">{skill}</li>
              ))}
            </ul>
          </div>
        )}
        
        {data.experience && data.experience.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Experience</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.experience.map((exp, index) => (
                <li key={index} className="text-muted-foreground">{exp}</li>
              ))}
            </ul>
          </div>
        )}
        
        {data.education && data.education.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-2">Education</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.education.map((edu, index) => (
                <li key={index} className="text-muted-foreground">{edu}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};