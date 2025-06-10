import React from 'react';

interface SimpleChartProps {
  data: { x: string; y: number }[];
  width?: number;
  height?: number;
  color?: string;
}

export const SimpleChart = ({ 
  data, 
  width = 500, 
  height = 300, 
  color = '#3b82f6' 
}: SimpleChartProps) => {
  const maxY = Math.max(...data.map(d => d.y), 0);
  
  return (
    <div className="relative" style={{ width, height }}>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
      
      <div className="flex h-full items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full rounded-t-sm"
              style={{
                height: `${(item.y / maxY) * 100}%`,
                backgroundColor: color
              }}
            ></div>
            <div className="text-xs text-gray-500 mt-1">{item.x}</div>
          </div>
        ))}
      </div>
    </div>
  );
};