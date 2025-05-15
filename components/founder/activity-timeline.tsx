"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

export interface ActivityItem {
  id: string;
  type: string;
  actor: string;
  message: string;
  timestamp: string;
  txHash?: string;
}

export interface ActivityTimelineProps {
  activity: ActivityItem[];
  className?: string;
  onItemClick?: (id: string) => void;
}

export function ActivityTimeline({ 
  activity, 
  className,
  onItemClick
}: ActivityTimelineProps) {
  // Parse and format timestamps
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (e) {
      return timestamp;
    }
  };

  // Get type-specific icon or color
  const getActivityTypeColor = (type: string) => {
    const typeMap: Record<string, string> = {
      'GRANT_ISSUED': 'bg-green-100 border-green-300 text-green-700',
      'TRANSFER': 'bg-blue-100 border-blue-300 text-blue-700',
      'APPROVAL': 'bg-purple-100 border-purple-300 text-purple-700',
      'REJECTED': 'bg-red-100 border-red-300 text-red-700',
    };
    
    return typeMap[type] || 'bg-gray-100 border-gray-300 text-gray-700';
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-muted">
          {activity.map((item) => (
            <li 
              key={item.id} 
              className="mb-6 ml-4 cursor-pointer"
              onClick={() => onItemClick?.(item.id)}
            >
              <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border border-background bg-primary"></div>
              <time className="mb-1 text-sm font-normal text-muted-foreground">{formatTime(item.timestamp)}</time>
              <div 
                className={cn(
                  "p-2 rounded border",
                  getActivityTypeColor(item.type)
                )}
              >
                <h3 className="text-sm font-semibold">{item.type}</h3>
                <p className="text-sm">{item.message}</p>
                {item.txHash && (
                  <p className="text-xs mt-1 font-mono">{item.txHash}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}