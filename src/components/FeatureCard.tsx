import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-feature-bg border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};