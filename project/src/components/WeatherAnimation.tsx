import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react';

interface WeatherAnimationProps {
  weatherCode: number;
}

export default function WeatherAnimation({ weatherCode }: WeatherAnimationProps) {
  const getWeatherIcon = () => {
    if (weatherCode >= 200 && weatherCode < 300) {
      return <CloudLightning className="w-16 h-16 text-yellow-400" />;
    } else if (weatherCode >= 300 && weatherCode < 600) {
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return <CloudSnow className="w-16 h-16 text-blue-200" />;
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return <CloudFog className="w-16 h-16 text-gray-400" />;
    } else if (weatherCode === 800) {
      return <Sun className="w-16 h-16 text-yellow-400" />;
    } else {
      return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  const iconVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={iconVariants}
      animate="animate"
      className="absolute -top-16 left-1/2 transform -translate-x-1/2"
    >
      {getWeatherIcon()}
    </motion.div>
  );
}