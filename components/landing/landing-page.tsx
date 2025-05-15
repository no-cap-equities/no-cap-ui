"use client";

import React from 'react';
import { Header } from './header';
import { RoleSelection } from './role-selection';
import { FeatureSection } from './feature-section';
import { Footer } from './footer';
import { RoleCardProps } from './role-card';

interface LandingPageProps {
  siteName: string;
  poweredBy?: string;
  roles: RoleCardProps[];
  features: { icon: string; label: string }[];
  links?: { label: string; href: string }[];
  certs?: { img: string; alt: string }[];
  onRoleSelect?: (id: string) => void;
}

export function LandingPage({
  siteName,
  poweredBy,
  roles,
  features,
  links,
  certs,
  onRoleSelect,
}: LandingPageProps) {
  const handleRoleSelect = (id: string) => {
    console.log(`Role selected: ${id}`);
    onRoleSelect?.(id);
    // In a real app, we would navigate to the appropriate dashboard or show auth dialog
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header siteName={siteName} poweredBy={poweredBy} />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Equity management for the digital age</h1>
            <p className="text-xl text-muted-foreground">
              Transparent, compliant, and blockchain-powered equity management
            </p>
          </div>
          
          <RoleSelection roles={roles} onRoleSelect={handleRoleSelect} />
        </div>
        
        <FeatureSection features={features} />
      </main>
      
      <Footer links={links} certs={certs} />
    </div>
  );
}