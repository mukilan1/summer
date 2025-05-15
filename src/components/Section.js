"use client";

import { forwardRef, useMemo } from 'react';
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
  
  // Enhanced natural backgrounds
  const heroClasses = isHero ? 'bg-gradient-to-b from-sky-50 via-sky-100/90 to-sky-200/80' : bgColor;
  
  // Check if this is the night section (second section)
  const isNightSection = index === 1;
  
  // Enhanced beach section check (third section)
  const isBeachSection = index === 2;
  
  // Enhanced stars section check (fourth section)
  const isStarsSection = index === 3;
  
  // Generate deterministic star styles to avoid hydration mismatches
  const starStyles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      // Use deterministic values and format consistently for both client and server
      const size = i % 10 === 0 ? 3 : i % 5 === 0 ? 2 : 1;
      
      // Format these consistently with fixed precision
      const topPercentage = Math.floor((Math.sin(i * 0.5) * 0.5 + 0.5) * 10000) / 100;
      const leftPercentage = Math.floor((Math.cos(i * 0.7) * 0.5 + 0.5) * 10000) / 100;
      
      // Use numerical values for opacity (not strings)
      const opacity = i % 10 === 0 ? 0.9 : i % 5 === 0 ? 0.8 : 0.7;
      
      // Format animation delay consistently
      const animationDelay = `${Math.floor((i * 0.3) % 5 * 100) / 100}s`;
      
      // Shadow size based on star size
      const shadowSize = i % 10 === 0 ? 4 : i % 5 === 0 ? 3 : 1;
      const shadowBlur = i % 10 === 0 ? 2 : i % 5 === 0 ? 1 : 0;
      const shadowOpacity = i % 10 === 0 ? 0.9 : i % 5 === 0 ? 0.8 : 0.7;
      
      return {
        width: `${size}px`,
        height: `${size}px`,
        top: `${topPercentage}%`,
        left: `${leftPercentage}%`,
        opacity: opacity,
        animationDelay: animationDelay,
        boxShadow: `0 0 ${shadowSize}px ${shadowBlur}px rgba(255,255,255,${shadowOpacity})`
      };
    });
  }, []);
  
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
      
      {/* Natural atmospheric overlays based on section type */}
      {isHero && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-50/10 to-transparent pointer-events-none z-1"></div>
      )}
      
      {isNightSection && (
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 via-transparent to-indigo-950/10 pointer-events-none z-1"></div>
      )}
      
      {isBeachSection && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-50/5 to-amber-100/10 pointer-events-none z-1"></div>
      )}
      
      {isStarsSection && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-slate-900/20 pointer-events-none z-1"></div>
      )}
      
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
      ) : isNightSection ? (
        // Enhanced Night Section with more natural appearance
        <div className="relative z-10 max-w-5xl px-6 md:px-10">
          <div className={`flex flex-col md:flex-row md:items-center transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="md:w-1/2 md:pr-10">
              <div className="mb-3">
                <span className={`inline-block text-sm md:text-base tracking-widest uppercase ${textColorClass} opacity-90 border-b border-indigo-400 pb-1`}>
                  {subtitle}
                </span>
              </div>
              
              <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 ${textColorClass} ${textShadowClass}`}>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-400 to-blue-300">
                  {title}
                </span>
              </h1>
              
              <p className={`text-lg md:text-xl ${textColorClass} ${descriptionShadowClass} mb-8 opacity-90 leading-relaxed`}>
                {description}
              </p>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button className={`px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 font-medium shadow-lg`}>
                  Night Activities
                </button>
                <button className={`px-6 py-3 rounded-full bg-transparent border border-indigo-300 text-indigo-100 hover:bg-indigo-900/30 transition-all duration-300 font-medium`}>
                  View Gallery
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <div className="relative w-full h-[300px] md:h-[350px] overflow-hidden rounded-xl">
                {/* Enhanced night atmosphere visual element */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/60 via-purple-900/50 to-blue-900/40 rounded-xl"></div>
                
                {/* Enhanced night decorative elements for natural starry sky - using pre-computed deterministic styles */}
                {starStyles.map((style, i) => (
                  <div 
                    key={`star-${i}`}
                    className="absolute rounded-full bg-white animate-twinkle"
                    style={style}
                  />
                ))}
                
                {/* Enhanced natural silhouette with organic shapes */}
                <div className="absolute bottom-0 w-full h-[40%] bg-black opacity-80"
                  style={{
                    clipPath: 'polygon(0% 100%, 10% 75%, 15% 80%, 20% 75%, 25% 80%, 30% 70%, 35% 75%, 40% 65%, 45% 70%, 50% 60%, 55% 65%, 60% 62%, 65% 65%, 70% 60%, 75% 65%, 80% 58%, 85% 65%, 90% 60%, 95% 70%, 100% 65%, 100% 100%)'
                  }}
                />
                
                {/* Enhanced moon reflection in water */}
                <div className="absolute bottom-0 w-full h-[30%] opacity-40"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(100,149,237,0.15))',
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  }}
                />
                
                {/* Water ripple effect */}
                <div className="absolute bottom-0 w-full h-[25%] opacity-20">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`ripple-${i}`}
                      className="absolute w-full"
                      style={{
                        height: '1px',
                        bottom: `${i * 5 + 2}px`,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)',
                        opacity: 0.3 + (5-i)*0.1
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="absolute top-4 right-4 text-xs text-indigo-200 bg-indigo-900/60 px-3 py-1 rounded-full">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                  Perfect night view
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Enhanced layout for other sections - beach and stars
        <div className="relative z-10 max-w-4xl px-6 md:px-10">
          <div className={`${sectionStyles} transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-2">
              <span className={`text-sm md:text-base tracking-widest uppercase ${textColorClass} opacity-90 ${isBeachSection ? 'border-b border-amber-300' : isStarsSection ? 'border-b border-indigo-400' : ''} pb-1`}>
                {subtitle}
              </span>
            </div>
            
            <h1 className={`text-hero font-bold mb-6 ${textColorClass} ${textShadowClass}`}>
              {title}
            </h1>
            
            <p className={`text-subtitle ${textColorClass} ${descriptionShadowClass} max-w-2xl mx-auto mb-8 leading-relaxed`}>
              {description}
            </p>
            
            <div className="mt-4">
              <button className={`px-6 py-3 rounded-full ${
                theme === 'light' 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : isBeachSection 
                    ? 'bg-amber-400 text-slate-900 hover:bg-amber-300' 
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
              } transition-all duration-300 font-medium shadow-lg`}>
                {index === 0 ? 'Explore Summer' : index === 1 ? 'Night Activities' : index === 2 ? 'Beach Locations' : 'Star Gazing Tours'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced atmospheric gradient overlays for more natural lighting */}
      {theme === 'light' ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none" />
      )}

      {/* Enhanced night-specific gradient overlay for ambient effect */}
      {isNightSection && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-indigo-950/30 pointer-events-none" />
      )}

      {/* Enhanced beach-specific gradient for natural lighting */}
      {isBeachSection && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-300/5 via-transparent to-amber-300/10 pointer-events-none" />
      )}

      {/* Enhanced hero-specific floating elements for a more natural atmosphere */}
      {isHero && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Enhanced decorative floating elements with natural appearance */}
          <div className="absolute top-[15%] right-[15%] w-32 h-32 rounded-full bg-amber-200/10 animate-float-slow"></div>
          <div className="absolute bottom-[25%] left-[10%] w-24 h-24 rounded-full bg-amber-300/15 animate-float-slow-reverse"></div>
          <div className="absolute top-[60%] right-[25%] w-16 h-16 rounded-full bg-amber-100/10 animate-float"></div>
          
          {/* Additional subtle atmospheric elements */}
          <div className="absolute bottom-[10%] right-[10%] w-48 h-24 rounded-full bg-sky-100/10 animate-float-slow" 
               style={{animationDelay: '1s'}}></div>
          <div className="absolute top-[40%] left-[15%] w-20 h-20 rounded-full bg-sky-200/5 animate-float-slow-reverse"
               style={{animationDelay: '2s'}}></div>
        </div>
      )}
    </section>
  );
});

Section.displayName = 'Section';

export default Section;
