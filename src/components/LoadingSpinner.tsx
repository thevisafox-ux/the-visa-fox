import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-200 max-w-sm w-full"
          >
            {/* Main Spinner */}
            <div className="relative">
              {/* Outer Ring */}
              <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-gray-200 rounded-full animate-spin border-t-saffron"></div>
              
              {/* Inner Ring */}
              <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 w-9 h-9 md:w-12 md:h-12 border-4 border-gray-100 rounded-full animate-spin border-t-indian-blue" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
              
              {/* Center Dot */}
              <div className="absolute top-4.5 left-4.5 md:top-6 md:left-6 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-saffron to-indian-blue rounded-full animate-pulse"></div>
            </div>
            
            {/* Loading Text */}
            <div className="mt-4 md:mt-6 text-center">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-700 font-semibold text-base md:text-lg"
              >
                Loading...
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-xs md:text-sm mt-1"
              >
                Please wait while we navigate
              </motion.p>
            </div>
            
            {/* Animated Dots */}
            <div className="flex justify-center mt-3 md:mt-4 space-x-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-saffron rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indian-blue rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-1.5 h-1.5 md:w-2 md:h-2 bg-saffron rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSpinner; 