"use client";

import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';

interface CapTableHolder {
  label: string;
  shares: number;
  pct: number;
}

export interface CapTablePieChartProps {
  holders: CapTableHolder[];
  className?: string;
  onSegmentClick?: (label: string) => void;
}

// Custom colors for the pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function CapTablePieChart({ 
  holders,
  className,
  onSegmentClick
}: CapTablePieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleClick = (data: any) => {
    onSegmentClick?.(data.name);
  };

  return (
    <div className={cn("flex flex-col rounded-lg border bg-card text-card-foreground shadow", className)}>
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Cap Table</h3>
      </div>
      <div className="p-4 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={holders.map(holder => ({ 
                name: holder.label, 
                value: holder.pct,
                shares: holder.shares
              }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              activeIndex={activeIndex !== null ? [activeIndex] : undefined}
              activeShape={(props) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
                return (
                  <g>
                    <path
                      d={props.arc!.path({
                        cx: cx as number,
                        cy: cy as number,
                        innerRadius: innerRadius as number,
                        outerRadius: (outerRadius as number) + 10,
                        startAngle: startAngle as number,
                        endAngle: endAngle as number,
                      })}
                      fill={fill}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  </g>
                );
              }}
            >
              {holders.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  cursor="pointer"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => {
                return [`${value}% (${props.payload.shares.toLocaleString()} shares)`, name];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}