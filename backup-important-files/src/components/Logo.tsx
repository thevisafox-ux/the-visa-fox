import React from 'react';
import ImageWithFallback from './ImageWithFallback';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-xl'
  };

  return (
    <div className={`${sizeClasses[size]} relative group logo-3d`}>
      <ImageWithFallback
        src="/logo.png"
        alt="The Visa Fox Logo"
        className={`w-full h-full object-contain rounded-lg border border-white/20 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl logo-glow ${className}`}
        fallbackText="V"
        fallbackIcon="🦊"
      />
      {/* Enhanced 3D Effect Overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      {/* Enhanced Border Glow */}
      <div className="absolute inset-0 rounded-lg border border-white/60 shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      {/* Subtle Inner Glow */}
      <div className="absolute inset-1 rounded-md bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default Logo; 