
import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WeatherChartProps {
  data: Array<{ time: string; temperature: number; precipitation?: number; }>;
  type: 'temperature' | 'precipitation';
  className?: string;
}

const WeatherChart = ({ data, type, className }: WeatherChartProps) => {
  const chartColor = type === 'temperature' ? '#33C3F0' : '#7BD3F7';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn("chart-container", className)}
    >
      <h3 className="text-lg font-medium mb-4 text-weather-darkBlue">
        {type === 'temperature' ? 'Temperature Forecast' : 'Precipitation Forecast'}
      </h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'temperature' ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: '#333F48' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={['dataMin - 2', 'dataMax + 2']}
                tick={{ fontSize: 12, fill: '#333F48' }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '0.5rem',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: '#333F48', fontWeight: 600 }}
                itemStyle={{ color: '#33C3F0' }}
              />
              <Area 
                type="monotone" 
                dataKey="temperature" 
                stroke={chartColor} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTemp)" 
              />
            </AreaChart>
          ) : (
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12, fill: '#333F48' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 'dataMax + 2']}
                tick={{ fontSize: 12, fill: '#333F48' }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '0.5rem',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ color: '#333F48', fontWeight: 600 }}
                itemStyle={{ color: '#7BD3F7' }}
              />
              <Line 
                type="monotone" 
                dataKey="precipitation" 
                stroke={chartColor} 
                strokeWidth={2}
                dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: chartColor }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default WeatherChart;
