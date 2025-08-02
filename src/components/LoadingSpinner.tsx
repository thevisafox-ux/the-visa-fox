import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
        {/* Main Spinner */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-saffron"></div>
          
          {/* Inner Ring */}
          <div className="absolute top-2 left-2 w-12 h-12 border-4 border-gray-100 rounded-full animate-spin border-t-fox-orange" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          
          {/* Center Dot */}
          <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-r from-saffron to-fox-orange rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="mt-6 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-700 font-semibold text-lg"
          >
            Loading...
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 text-sm mt-1"
          >
            Please wait while we navigate
          </motion.p>
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center mt-4 space-x-1">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="w-2 h-2 bg-saffron rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 bg-fox-orange rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 bg-saffron rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner; 