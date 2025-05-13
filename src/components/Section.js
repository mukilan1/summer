"use client";

import { forwardRef } from "react";
import CelestialBody from "./CelestialBody";

const Section = forwardRef(({ 
  index, 
  title, 
  description, 
  celestial, 
  position, 
  theme, 
  bgColor, 
  isActive 
}, ref) => {
  // Determine text color and shadow based on theme
  const textColorClass = theme === 'light' ? 'text-slate-900' : 'text-white';
  const textShadowClass = theme === 'light' ? 'text-shadow-lg' : 'text-shadow-xl';
  const descriptionShadowClass = theme === 'light' ? 'text-shadow' : 'text-shadow-lg';
  
  return (
    <section 
      ref={ref}
      data-index={index}
      className={`relative h-screen w-screen flex items-center justify-center snap-start overflow-hidden ${bgColor}`}
    >
      <CelestialBody 
        type={celestial} 
        position={position} 
        isActive={isActive} 
      />
      
      <div className="relative z-10 max-w-4xl px-6 md:px-10 text-center">
        <div className={`transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className={`text-hero font-bold mb-6 ${textColorClass} ${textShadowClass}`}>
            {title}
          </h1>
          <p className={`text-subtitle ${textColorClass} ${descriptionShadowClass} max-w-2xl mx-auto`}>
            {description}
          </p>
        </div>
      </div>
      
      {/* Background enhancement elements based on theme */}
      {theme === 'light' ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
      )}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
