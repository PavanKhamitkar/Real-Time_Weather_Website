import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Sun, Sunset } from 'lucide-react';
import { motion } from 'framer-motion';
import WeatherAnimation from './WeatherAnimation';

interface WeatherCardProps {
  weather: any;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  if (!weather) return null;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-2xl"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">{weather.name}</h2>
          <p className="text-gray-500 text-lg">{weather.sys.country}</p>
        </motion.div>
        
        <div className="text-center relative">
          <WeatherAnimation weatherCode={weather.weather[0].id} />
          <motion.div 
            variants={itemVariants}
            className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {Math.round(weather.main.temp)}°C
          </motion.div>
          <p className="text-xl text-gray-600 capitalize mt-2">{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            icon: <Thermometer className="text-blue-500 w-6 h-6" />,
            label: "Feels Like",
            value: `${Math.round(weather.main.feels_like)}°C`
          },
          {
            icon: <Droplets className="text-blue-500 w-6 h-6" />,
            label: "Humidity",
            value: `${weather.main.humidity}%`
          },
          {
            icon: <Wind className="text-blue-500 w-6 h-6" />,
            label: "Wind Speed",
            value: `${weather.wind.speed} m/s`
          },
          {
            icon: <Cloud className="text-blue-500 w-6 h-6" />,
            label: "Cloudiness",
            value: `${weather.clouds.all}%`
          },
          {
            icon: <Sun className="text-blue-500 w-6 h-6" />,
            label: "Sunrise",
            value: formatTime(weather.sys.sunrise)
          },
          {
            icon: <Sunset className="text-blue-500 w-6 h-6" />,
            label: "Sunset",
            value: formatTime(weather.sys.sunset)
          }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            variants={itemVariants}
            custom={index}
            className="flex items-center gap-3 bg-white/50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {item.icon}
            <div>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="text-xl font-semibold text-gray-800">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}