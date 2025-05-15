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
  // Determine if this is the hero section (first section)
  const isHero = index === 0;
  
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
  
  // Hero-specific styles
  const heroClasses = isHero ? 'bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200' : bgColor;
  
  return (
    <section 
      ref={ref}
      data-index={index}
      className={`relative h-screen w-screen flex items-center justify-center snap-start overflow-hidden ${heroClasses}`}
    >
      <CelestialBody 
        type={celestial} 
        position={position} 
        isActive={isActive} 
        isHero={isHero}
      />
      
      {isHero ? (
        // Hero-specific content layout
        <div className="relative z-10 max-w-5xl px-6 md:px-10 mt-16">
          <div className={`flex flex-col items-center transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-2">
              <span className={`inline-block text-sm md:text-base tracking-widest uppercase ${textColorClass} opacity-80 border-b-2 border-amber-400 pb-1 px-2`}>
                {subtitle}
              </span>
            </div>
            
            <h1 className={`text-4xl md:text-7xl lg:text-8xl font-bold mb-6 ${textColorClass} ${textShadowClass} text-center`}>
              <span className="block">Experience</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500">
                Summer 2025
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl ${textColorClass} ${descriptionShadowClass} max-w-2xl text-center mb-10 opacity-90`}>
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 mt-2">
              <button className={`px-8 py-4 rounded-full bg-amber-400 text-slate-900 hover:bg-amber-300 transition-all duration-300 font-medium shadow-lg text-lg`}>
                Explore Summer
              </button>
              <button className={`px-8 py-4 rounded-full bg-transparent border-2 border-slate-700 text-slate-900 hover:bg-slate-100/50 transition-all duration-300 font-medium shadow-sm text-lg`}>
                View Catalog
              </button>
            </div>
            
            <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center z-10 animate-bounce opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // Existing layout for other sections
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
      )}
      
      {theme === 'light' ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      )}

      {/* Hero-specific floating elements */}
      {isHero && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Decorative floating elements */}
          <div className="absolute top-[15%] right-[15%] w-32 h-32 rounded-full bg-amber-200/20 animate-float-slow"></div>
          <div className="absolute bottom-[25%] left-[10%] w-24 h-24 rounded-full bg-amber-300/30 animate-float-slow-reverse"></div>
          <div className="absolute top-[60%] right-[25%] w-16 h-16 rounded-full bg-amber-100/20 animate-float"></div>
        </div>
      )}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
