import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FooterLink {
  label: string;
  href: string;
}

interface Certificate {
  img: string;
  alt: string;
}

export interface FooterProps {
  links?: FooterLink[];
  certs?: Certificate[];
  className?: string;
}

export function Footer({ links = [], certs = [], className }: FooterProps) {
  return (
    <footer className={cn("py-8 border-t", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links */}
          {links.length > 0 && (
            <nav className="mb-6 md:mb-0">
              <ul className="flex gap-6">
                {links.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          
          {/* Certificates */}
          {certs.length > 0 && (
            <div className="flex gap-4">
              {certs.map((cert, index) => (
                <div 
                  key={index} 
                  className="relative w-16 h-16 grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <div className="flex items-center justify-center h-full bg-muted rounded-full p-2">
                    {cert.img ? (
                      <Image
                        src={cert.img}
                        alt={cert.alt}
                        width={40}
                        height={40}
                      />
                    ) : (
                      <span className="text-xs text-muted-foreground text-center">
                        {cert.alt}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} No Cap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}