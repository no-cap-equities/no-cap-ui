"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  ChevronDown, 
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

interface Company {
  id: string;
  name: string;
  logo: string;
}

interface TopBarProps {
  company: Company;
  className?: string;
  notificationCount?: number;
  onCompanyChange?: (companyId: string) => void;
}

export function TopBar({ 
  company,
  className,
  notificationCount = 0,
  onCompanyChange
}: TopBarProps) {
  // Example company list - in a real app this would come from an API
  const companies = [
    { id: "acme-inc", name: "Acme Robotics", logo: "/img/acme.svg" },
    { id: "beta-co", name: "Beta Company", logo: "" },
    { id: "gamma-corp", name: "Gamma Corp", logo: "" }
  ];

  return (
    <div className={cn(
      "h-16 border-b flex items-center justify-between px-4",
      className
    )}>
      <div className="flex items-center gap-4">
        {/* Company Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 font-normal hover:bg-transparent p-0"
            >
              {company.logo ? (
                <div className="w-8 h-8 relative rounded-md overflow-hidden">
                  <Image 
                    src={company.logo} 
                    alt={company.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                  <span className="text-primary font-bold">{company.name.charAt(0)}</span>
                </div>
              )}
              <span>{company.name}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {companies.map((co) => (
              <DropdownMenuItem 
                key={co.id}
                className="flex items-center gap-2"
                onClick={() => onCompanyChange?.(co.id)}
              >
                {co.logo ? (
                  <div className="w-6 h-6 relative rounded-md overflow-hidden">
                    <Image 
                      src={co.logo} 
                      alt={co.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                    <span className="text-primary text-xs font-bold">{co.name.charAt(0)}</span>
                  </div>
                )}
                <span>{co.name}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Add New Company</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 pl-2 border-l">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Press / to search</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </Button>
        
        {/* User Avatar */}
        <Avatar className="h-8 w-8">
          <AvatarImage src="/img/user-avatar.png" />
          <AvatarFallback>NC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}