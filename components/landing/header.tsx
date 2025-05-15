import React from 'react';
import { cn } from '@/lib/utils';

export interface HeaderProps {
  siteName: string;
  poweredBy?: string;
  className?: string;
}

export function Header({ siteName, poweredBy, className }: HeaderProps) {
  return (
    <header className={cn("flex items-center justify-between p-4 sm:p-6", className)}>
      <div className="flex items-center gap-2">
        {/* Blue cap emoji logo */}
        <span className="text-2xl sm:text-3xl" aria-hidden="true">
          🧢
        </span>
        <span className="font-bold text-xl sm:text-2xl">{siteName}</span>
      </div>
      
      {poweredBy && (
        <div className="text-xs sm:text-sm text-muted-foreground">
          Powered by {poweredBy}
        </div>
      )}
    </header>
  );
}