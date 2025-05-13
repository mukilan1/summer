"use client";

import { useEffect, useRef, useState } from "react";

const CelestialBody = ({ type, position, isActive }) => {
  const elementRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stars, setStars] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Generate stars on client-side only to avoid hydration mismatch
  useEffect(() => {
    // Create deterministic star positions with a seed
    const generateStars = (count, type) => {
      return Array.from({ length: count }, (_, i) => ({
        id: `${type}-${i}`,
        size: type === 'twinkle' 
          ? (i % 5 === 0 ? 2 : 1) 
          : (i % 10 === 0 ? 3 : i % 5 === 0 ? 2 : 1),
        top: `${(Math.sin(i * 0.37) * 0.5 + 0.5) * 100}%`,
        left: `${(Math.cos(i * 0.73) * 0.5 + 0.5) * 100}%`,
        animationDelay: type === 'twinkle' ? `${(i * 0.21) % 5}s` : null,
        animationDuration: type === 'twinkle' ? `${2 + (i * 0.17) % 3}s` : null,
        opacity: type === 'twinkle' ? 0.9 : (0.5 + Math.sin(i) * 0.5),
      }));
    };

    if (!initialized) {
      const staticStars = generateStars(150, 'static');
      const twinklingStars = generateStars(40, 'twinkle');
      setStars([...staticStars, ...twinklingStars]);
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    if (!elementRef.current) return;

    if (isActive) {
      // Entrance animation
      elementRef.current.style.opacity = '1';
      elementRef.current.style.transform = 'translate(0, 0)';
      
      // Start scroll-based animations
      const handleScroll = () => {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const sectionTop = elementRef.current.closest('section').offsetTop;
        const relativeScroll = scrollY - sectionTop;
        const progress = Math.min(Math.max(relativeScroll / viewportHeight, 0), 1);
        setScrollProgress(progress);
      };
      
      // Initial calculation
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Reset position when not active
      const xPos = position === 'left' ? '-100%' : '100%';
      elementRef.current.style.opacity = '0';
      elementRef.current.style.transform = `translate(${xPos}, 0)`;
    }
  }, [isActive, position]);

  // Unified celestial body component with morph capabilities
  return (
    <div 
      ref={elementRef}
      className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-0 overflow-hidden"
      style={{ 
        transform: `translate(${position === 'left' ? '-100%' : '100%'}, 0)`,
        pointerEvents: 'none'
      }}
    >
      {/* Background starfield */}
      <div className="absolute inset-0 w-full h-full">
        {stars.filter(star => star.id?.startsWith('static')).map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
              boxShadow: star.size > 1 ? `0 0 ${star.size + 1}px ${star.size - 1}px rgba(255,255,255,0.7)` : 'none'
            }}
          />
        ))}
        
        {stars.filter(star => star.id?.startsWith('twinkle')).map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
              boxShadow: `0 0 ${star.size + 2}px ${star.size}px rgba(255,255,255,0.9)`
            }}
          />
        ))}
        
        {/* Nebula/galaxy backgrounds */}
        <div className="absolute transition-all duration-1000 ease-in-out"
          style={{
            width: '40%',
            height: '50%',
            top: '10%',
            left: position === 'left' ? '70%' : '10%',
            background: 'radial-gradient(ellipse at center, rgba(100,50,200,0.3) 0%, rgba(100,50,200,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(30px)',
            transform: `rotate(${scrollProgress * 20}deg) scale(${1 + scrollProgress * 0.3})`,
            opacity: type === 'moon' ? (0.7 + scrollProgress * 0.3) : (0.7 - scrollProgress * 0.7)
          }}
        />
      </div>
      
      {/* Fixed positioning for celestial bodies */}
      <div 
        className={`absolute ${position === 'left' ? 'left-[10%]' : 'right-[10%]'} ${type === 'sun' ? 'bottom-[10%]' : 'top-[10%]'} transition-all duration-1000 ease-out`}
        style={{
          width: type === 'sun' ? '200px' : '180px',
          height: type === 'sun' ? '200px' : '180px',
          transform: `translateY(${type === 'sun' ? scrollProgress * 30 : -scrollProgress * 30}%) scale(${type === 'sun' ? 1 - scrollProgress * 0.2 : 0.8 + scrollProgress * 0.3})`,
          zIndex: 5
        }}
      >
        {/* Actual celestial body */}
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{ 
            background: type === 'sun'
              ? `radial-gradient(circle, 
                  rgba(255, 245, 224, 1) 0%, 
                  rgba(255, 215, 0, 1) 20%, 
                  rgba(255, 165, 0, 1) 70%, 
                  rgba(255, 140, 0, 1) 100%)`
              : `radial-gradient(circle, 
                  rgba(248, 248, 248, 1) 0%, 
                  rgba(230, 230, 230, 1) 30%, 
                  rgba(210, 210, 210, 1) 60%, 
                  rgba(180, 180, 180, 1) 90%)`,
            boxShadow: type === 'sun'
              ? `0 0 60px 30px rgba(255, 215, 0, 0.5),
                 0 0 100px 60px rgba(255, 165, 0, 0.3),
                 0 0 140px 90px rgba(255, 140, 0, 0.2)`
              : `0 0 30px 10px rgba(230,230,230,0.3),
                 0 0 60px 30px rgba(230,230,230,0.1)`,
            transform: `rotate(${scrollProgress * (type === 'sun' ? 20 : 10)}deg)`
          }}
        >
          {/* Sun-specific surface features */}
          {type === 'sun' && (
            <>
              <div 
                className="absolute -inset-1/4 w-[150%] h-[150%] rounded-full animate-spin-slow"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 40%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 60%)',
                  filter: 'blur(5px)',
                  opacity: 0.8,
                  animationDuration: '60s'
                }}
              />
              
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden animate-pulse-slow">
                <div className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(255,170,0,0) 0deg 340deg, rgba(255,200,50,0.8) 345deg 355deg, rgba(255,170,0,0) 360deg)',
                    filter: 'blur(2px)'
                  }}
                />
              </div>
            </>
          )}
          
          {/* Moon-specific surface features */}
          {type === 'moon' && (
            <>
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden opacity-40"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.1\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
                  mixBlendMode: 'multiply'
                }}
              />
              
              <div className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(20,20,40,0.9) 0%, rgba(20,20,40,0) 100%)',
                  clipPath: `circle(50% at ${Math.max(0, 50 - scrollProgress * 50)}% 50%)`
                }}
              />
            </>
          )}
        </div>
      </div>
      
      {/* Cloud effect for sun */}
      {type === 'sun' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div 
            className="absolute w-[140%] h-[70%] transition-all duration-1000 ease-in-out"
            style={{
              top: `${30 + scrollProgress * 40}%`,
              left: position === 'left' ? '10%' : '-50%',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)',
              borderRadius: '50%',
              filter: 'blur(20px)',
              transform: `scale(${1 + scrollProgress * 0.7}) rotate(${scrollProgress * 10}deg)`,
              zIndex: 10
            }}
          />
        </div>
      )}
      
      {/* Moon craters */}
      {type === 'moon' && (
        <div className="absolute"
          style={{ 
            top: position === 'left' ? '10%' : '10%',
            left: position === 'left' ? '10%' : 'auto',
            right: position === 'left' ? 'auto' : '10%',
            width: '180px',
            height: '180px',
            opacity: 1,
            zIndex: 15
          }}
        >
          {[...Array(15)].map((_, i) => {
            const size = 6 + (i % 5) * 5 + (i % 3) * 3;
            const depth = 1 + (i % 3);
            const topPos = (i * 7.3) % 85 + 5;
            const leftPos = (i * 11.7) % 85 + 5;
            
            return (
              <div 
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${topPos}%`,
                  left: `${leftPos}%`,
                  background: `radial-gradient(circle at ${30 + i % 40}% ${25 + i % 50}%, #D8D8D8 0%, #A8A8A8 80%)`,
                  boxShadow: `inset ${depth}px ${depth}px ${depth * 2}px rgba(0,0,0,0.4), 
                            inset -${depth}px -${depth}px ${depth * 2}px rgba(255,255,255,0.3)`,
                  opacity: scrollProgress * 0.8
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CelestialBody;
