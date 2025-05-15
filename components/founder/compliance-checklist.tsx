"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export type ChecklistItemStatus = 'complete' | 'warning' | 'pending' | 'due-soon';

export interface ChecklistItem {
  id: string;
  label: string;
  status: ChecklistItemStatus;
  dueDate?: string;
}

export interface ComplianceChecklistProps {
  items: ChecklistItem[];
  className?: string;
  onItemClick?: (id: string) => void;
}

export function ComplianceChecklist({ 
  items, 
  className,
  onItemClick
}: ComplianceChecklistProps) {
  // Status icon mapping
  const statusIcons: Record<ChecklistItemStatus, React.ReactNode> = {
    'complete': <CheckCircle2 className="h-5 w-5 text-green-500" />,
    'warning': <AlertCircle className="h-5 w-5 text-amber-500" />,
    'pending': <Clock className="h-5 w-5 text-gray-400" />,
    'due-soon': <Clock className="h-5 w-5 text-red-500" />
  };

  // Status text classes
  const statusClasses: Record<ChecklistItemStatus, string> = {
    'complete': 'text-green-500',
    'warning': 'text-amber-500',
    'pending': 'text-gray-400',
    'due-soon': 'text-red-500'
  };

  // Format date if present
  const formatDueDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Compliance Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item) => (
            <li 
              key={item.id}
              className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors"
              onClick={() => onItemClick?.(item.id)}
            >
              <div className="mt-0.5">
                {statusIcons[item.status]}
              </div>
              <div>
                <p className="font-medium">{item.label}</p>
                {item.dueDate && (
                  <p className={cn("text-xs", statusClasses[item.status])}>
                    Due: {formatDueDate(item.dueDate)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}