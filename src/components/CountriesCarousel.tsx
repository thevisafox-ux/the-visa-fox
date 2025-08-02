import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Country {
  name: string;
  flag: string;
  emoji: string;
  visa: string;
}

interface CountriesCarouselProps {
  countries: Country[];
  autoPlayInterval?: number;
}

const CountriesCarousel: React.FC<CountriesCarouselProps> = ({ 
  countries, 
  autoPlayInterval = 2000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create a continuous loop of countries (repeat the array 3 times for smooth flow)
  const continuousCountries = [...countries, ...countries, ...countries];

  // Auto-play functionality for continuous upward movement (no pause on hover)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        // Reset to beginning when we reach the end of first set
        return nextIndex >= countries.length ? 0 : nextIndex;
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, countries.length]);

  // Get current set of 4 countries
  const getCurrentCountries = () => {
    return continuousCountries.slice(currentIndex, currentIndex + 4);
  };

  // Get next set of 4 countries (coming from below)
  const getNextCountries = () => {
    const nextIndex = (currentIndex + 4) % continuousCountries.length;
    return continuousCountries.slice(nextIndex, nextIndex + 4);
  };

  return (
    <div className="relative overflow-hidden h-48">
      {/* Continuous Upward Flow Container */}
      <div className="relative h-full">
        {/* Current set moving up */}
        <motion.div
          key={`current-${currentIndex}`}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -200, opacity: 1 }}
          exit={{ y: -400, opacity: 0 }}
          transition={{ 
            duration: autoPlayInterval / 1000,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <div className="grid grid-cols-2 gap-3 h-full">
            {getCurrentCountries().map((country, index) => (
              <motion.div
                key={`current-${currentIndex}-${country.name}-${index}`}
                className="app-card text-center p-4 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center mb-2">
                  {/* Emoji Flag */}
                  <div className="text-3xl md:text-4xl transform transition-transform duration-300 hover:scale-110 mb-1">
                    {country.emoji}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-navy">{country.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{country.visa}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next set coming from below */}
        <motion.div
          key={`next-${currentIndex}`}
          initial={{ y: 200, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -200, opacity: 0 }}
          transition={{ 
            duration: autoPlayInterval / 1000,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <div className="grid grid-cols-2 gap-3 h-full">
            {getNextCountries().map((country, index) => (
              <motion.div
                key={`next-${currentIndex}-${country.name}-${index}`}
                className="app-card text-center p-4 transition-all duration-300 hover:scale-105"
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.01 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex flex-col items-center mb-2">
                  {/* Emoji Flag */}
                  <div className="text-3xl md:text-4xl transform transition-transform duration-300 hover:scale-110 mb-1">
                    {country.emoji}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-navy">{country.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{country.visa}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Third set (for seamless transition) */}
        <motion.div
          key={`third-${currentIndex}`}
          initial={{ y: 400, opacity: 0.1 }}
          animate={{ y: 200, opacity: 0.1 }}
          exit={{ y: 0, opacity: 0 }}
          transition={{ 
            duration: autoPlayInterval / 1000,
            ease: "linear"
          }}
          className="absolute inset-0"
        >
          <div className="grid grid-cols-2 gap-3 h-full">
            {getNextCountries().map((country, index) => (
              <div
                key={`third-${currentIndex}-${country.name}-${index}`}
                className="app-card text-center p-4 opacity-10"
              >
                <div className="flex flex-col items-center mb-2">
                  {/* Emoji Flag */}
                  <div className="text-3xl md:text-4xl mb-1">
                    {country.emoji}
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-navy">{country.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{country.visa}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Movement indicator */}
      <div className="absolute top-2 right-2">
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
};

export default CountriesCarousel; 