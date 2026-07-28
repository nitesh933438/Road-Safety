import React from 'react';
import { APP_LOGO_DATA_URI } from '../../assets/logoDataUri';

interface AppLogoProps {
  className?: string;
  imgClassName?: string;
  alt?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = "w-10 h-10 rounded-xl overflow-hidden shadow-md bg-slate-900 border border-amber-500/40 p-0.5 flex-shrink-0 flex items-center justify-center",
  imgClassName = "w-full h-full object-cover rounded-lg",
  alt = "GoldenGuard Logo"
}) => {
  return (
    <div className={className}>
      <img
        src={APP_LOGO_DATA_URI}
        alt={alt}
        className={imgClassName}
        loading="eager"
      />
    </div>
  );
};
