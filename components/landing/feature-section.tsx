import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, PieChart, Zap } from 'lucide-react';

interface Feature {
  icon: string;
  label: string;
}

export interface FeatureSectionProps {
  features: Feature[];
  className?: string;
}

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-6 w-6" />,
  PieChart: <PieChart className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
};

export function FeatureSection({ features, className }: FeatureSectionProps) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 bg-muted/50 rounded-lg"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                {iconMap[feature.icon] || <div className="h-6 w-6" />}
              </div>
              <h3 className="text-lg font-medium">{feature.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}