import React from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface HistoricalWeatherProps {
  data: any[];
}

export default function HistoricalWeather({ data }: HistoricalWeatherProps) {
  if (!data?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-6 mt-8 w-full max-w-2xl"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="dt_txt" 
              tickFormatter={(value) => format(new Date(value), 'EEE')}
              stroke="#4B5563"
            />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(value) => format(new Date(value), 'EEEE, MMM d, h:mm a')}
            />
            <Line 
              type="monotone" 
              dataKey="main.temp" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2 }}
              name="Temperature (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}