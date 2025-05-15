"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  ResponsiveContainer, 
  Cell,
  Tooltip
} from 'recharts';

interface Stablecoin {
  symbol: string;
  amount: number;
}

export interface TreasuryWidgetProps {
  usdCents: number;
  stablecoins: Stablecoin[];
  runwayDays: number;
  className?: string;
}

export function TreasuryWidget({ 
  usdCents, 
  stablecoins, 
  runwayDays,
  className 
}: TreasuryWidgetProps) {
  // Format USD amount from cents
  const usdFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usdCents / 100);
  
  // Format runway
  const runwayMonths = Math.floor(runwayDays / 30);
  const runwayText = runwayMonths >= 1 
    ? `${runwayMonths} month${runwayMonths > 1 ? 's' : ''}` 
    : `${runwayDays} days`;

  // Stablecoin chart data
  const chartData = stablecoins.map(coin => ({
    name: coin.symbol,
    value: coin.amount / 100, // Convert from smallest unit
  }));

  // Color based on runway status
  const getRunwayColor = (days: number) => {
    if (days > 365) return "text-green-600";
    if (days > 180) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Treasury</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-2xl font-bold">{usdFormatted}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Runway</p>
            <p className={cn("text-xl font-bold", getRunwayColor(runwayDays))}>
              {runwayText}
            </p>
          </div>
          
          {stablecoins.length > 0 && (
            <div className="mt-4 h-32">
              <p className="text-sm text-muted-foreground mb-2">Stablecoin Allocation</p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <XAxis type="number" hide />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                    labelFormatter={(name) => name}
                  />
                  <Bar 
                    dataKey="value" 
                    barSize={24}
                    radius={[4, 4, 4, 4]}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={index === 0 ? '#3B82F6' : '#10B981'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}