"use client";

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface RoleCardProps {
  id: string;
  title: string;
  img: string;
  cta: string;
  onClick?: (id: string) => void;
  className?: string;
  disabled?: boolean;
}

export function RoleCard({ 
  id, 
  title, 
  img, 
  cta, 
  onClick, 
  className,
  disabled = false
}: RoleCardProps) {
  // Get image extension to determine how to display it
  const imgExt = img.split('.').pop()?.toLowerCase();
  const isSvg = imgExt === 'svg';

  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg", 
      disabled && "opacity-60 cursor-not-allowed",
      className
    )}>
      <CardContent className="p-6 flex-grow">
        <div className="aspect-square relative mb-4 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          {/* Fallback if image not available */}
          {!img && (
            <span className="text-4xl font-bold text-muted-foreground">
              {title.charAt(0)}
            </span>
          )}
          
          {/* SVG image - handled without Image component */}
          {img && isSvg && (
            <img
              src={img}
              alt={`${title} role`}
              className="object-cover w-full h-full"
            />
          )}
          
          {/* Regular image with Next.js Image component */}
          {img && !isSvg && (
            <Image
              src={img}
              alt={`${title} role`}
              fill
              className="object-cover"
            />
          )}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
      </CardContent>
      <CardFooter className="pt-0 pb-6">
        <Button 
          className="w-full" 
          onClick={() => onClick?.(id)}
          aria-pressed="false"
          disabled={disabled}
        >
          {cta}
        </Button>
      </CardFooter>
    </Card>
  );
}