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
    <div className={`${sizeClasses[size]} relative shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm`}>
      <ImageWithFallback
        src="/logo.png"
        alt="The Visa Fox Logo"
        className={`h-full w-full object-contain ${className}`}
        fallbackText="V"
        fallbackIcon="🦊"
      />
    </div>
  );
};

export default Logo;
