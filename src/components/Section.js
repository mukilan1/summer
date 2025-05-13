"use client";

import { forwardRef } from 'react';
import CelestialBody from './CelestialBody';

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
  
  // Section-specific styles based on index
  const sectionStyles = [
    'flex flex-col items-center text-center', // Hero section
    'flex flex-col md:flex-row md:items-center', // Night section
    'flex flex-col items-center md:items-end text-right', // Beach section
    'flex flex-col md:items-start text-left' // Stars section
  ][index % 4];
  
  // Custom subtitle for each section
  const subtitle = [
    "WELCOME TO OUR SUMMER COLLECTION",
    "DISCOVER EVENING ACTIVITIES",
    "EXPLORE BEACH DESTINATIONS",
    "SUMMER NIGHT EXPERIENCES"
  ][index % 4];
  
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
      
      <div className="relative z-10 max-w-4xl px-6 md:px-10">
        <div className={`${sectionStyles} transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-2">
            <span className={`text-sm md:text-base tracking-widest uppercase ${textColorClass} opacity-80`}>
              {subtitle}
            </span>
          </div>
          
          <h1 className={`text-hero font-bold mb-6 ${textColorClass} ${textShadowClass}`}>
            {title}
          </h1>
          
          <p className={`text-subtitle ${textColorClass} ${descriptionShadowClass} max-w-2xl mx-auto mb-8`}>
            {description}
          </p>
          
          <div className="mt-4">
            <button className={`px-6 py-3 rounded-full ${theme === 'light' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-amber-400 text-slate-900 hover:bg-amber-300'} transition-all duration-300 font-medium shadow-lg`}>
              {index === 0 ? 'Explore Summer' : index === 1 ? 'Night Activities' : index === 2 ? 'Beach Locations' : 'Star Gazing Tours'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Background enhancement elements based on theme */}
      {theme === 'light' ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none"></div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
      )}
      
      {/* Section-specific decorative elements */}
      {index === 0 && (
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center z-10 animate-bounce opacity-70">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
