"use client";
import { useRef, useState, useEffect } from 'react';

const CelestialBody = ({ type, position, isActive, isHero = false }) => {
  const elementRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Generate stars on client-side only to avoid hydration mismatch
  useEffect(() => {
    // Create deterministic star positions with a seed
    const generateStars = (count, type) => {
      return Array.from({ length: count }, (_, i) => {
        // Ensure consistent numerical precision 
        const topValue = Math.sin(i * 0.37) * 0.5 + 0.5;
        const leftValue = Math.cos(i * 0.73) * 0.5 + 0.5;
        const opacityValue = type === 'twinkle' ? 0.9 : (0.5 + Math.sin(i) * 0.5);
        
        return {
          id: `${type}-${i}`,
          size: type === 'twinkle' 
            ? (i % 5 === 0 ? 2 : 1) 
            : (i % 10 === 0 ? 3 : i % 5 === 0 ? 2 : 1),
          top: `${Math.floor(topValue * 10000) / 100}%`, // Format to 2 decimal places
          left: `${Math.floor(leftValue * 10000) / 100}%`, // Format to 2 decimal places
          animationDelay: type === 'twinkle' ? `${Math.floor((i * 0.21) % 5 * 100) / 100}s` : null, // Use 'animationDelay' for React
          animationDuration: type === 'twinkle' ? `${Math.floor((2 + (i * 0.17) % 3) * 100) / 100}s` : null, // Use 'animationDuration' for React
          opacity: Math.floor(opacityValue * 100) / 100, // Ensure consistent precision
        };
      });
    };

    // Generate more deterministic shooting stars to avoid hydration mismatches
    const generateShootingStars = (count) => {
      return Array.from({ length: count }, (_, i) => {
        // Use deterministic values based on index instead of Math.random()
        const starAngle = -30 + (i * 10) % 60; // Between -30 and 30 degrees
        const yOffset = 5 + (i * 3) % 15; // Between 5-20vh
        const opacityValue = 0.7 + (i * 0.1) % 0.3;
        const sizeValue = 1 + (i * 0.3) % 1.5;
        
        return {
          id: `shooting-${i}`,
          delay: `${Math.floor((5 + (i * 7) % 20) * 100) / 100}s`, // Consistent formatting
          duration: `${Math.floor((0.8 + (i * 0.3) % 1.7) * 100) / 100}s`, // Consistent formatting
          top: `${Math.floor((i * 7) % 50 * 100) / 100}%`, // Consistent formatting
          left: `${Math.floor((i * 11) % 80 * 100) / 100}%`, // Consistent formatting
          angle: Math.floor(starAngle * 100) / 100, // Consistent formatting
          yOffset: `${Math.floor(yOffset * 100) / 100}vh`, // Consistent formatting
          size: Math.floor(sizeValue * 100) / 100, // Consistent formatting
          tailLength: Math.floor((80 + (i * 15) % 100) * 100) / 100, // Consistent formatting
          opacity: Math.floor(opacityValue * 100) / 100, // Ensure consistent precision
          // Generate particles for trail, deterministically
          particles: Array.from({ length: 3 + (i % 4) }, (_, j) => {
            const particleSize = 0.5 + ((i+j) * 0.2) % 1;
            const particleOpacity = 0.4 + ((i+j) * 0.1) % 0.4;
            
            return {
              id: `particle-${i}-${j}`,
              size: Math.floor(particleSize * 100) / 100, // Consistent formatting
              distance: Math.floor((15 + j * 15 + (i * 2) % 10) * 100) / 100, // Consistent formatting
              angle: Math.floor(((i+j) * 3) % 20 - 10), // Integer value
              opacity: Math.floor(particleOpacity * 100) / 100, // Consistent formatting
              delay: `${Math.floor((0.1 + j * 0.05 + (i * 0.01) % 0.1) * 100) / 100}s` // Consistent formatting
            };
          })
        };
      });
    };

    // Generate clouds with deterministic values
    const generateClouds = (count) => {
      return Array.from({ length: count }, (_, i) => {
        const cloudSize = 50 + (i * 15) % 100;
        const cloudTop = 10 + (i * 10) % 60;
        const cloudSpeed = 30 + (i * 10) % 60;
        const cloudOpacity = 0.6 + (i * 0.05) % 0.3;
        const cloudScale = 0.8 + (i * 0.1) % 0.4;
        
        return {
          id: `cloud-${i}`,
          size: Math.floor(cloudSize * 100) / 100, // Consistent formatting
          top: `${Math.floor(cloudTop * 100) / 100}%`, // Consistent formatting
          initialLeft: i % 2 === 0 ? -20 : 100, // Consistent integer values
          direction: i % 2 === 0 ? 1 : -1, // Consistent integer values
          speed: Math.floor(cloudSpeed * 100) / 100, // Consistent formatting
          delay: `${Math.floor((i * 1.2) % 5 * 100) / 100}s`, // Consistent formatting
          opacity: Math.floor(cloudOpacity * 100) / 100, // Consistent formatting
          scale: Math.floor(cloudScale * 100) / 100, // Consistent formatting
        };
      });
    };

    if (!initialized) {
      const staticStars = generateStars(150, 'static');
      const twinklingStars = generateStars(40, 'twinkle');
      const shootingStarsArray = generateShootingStars(8);
      const cloudsArray = generateClouds(6);
      
      setStars([...staticStars, ...twinklingStars]);
      setShootingStars(shootingStarsArray);
      setClouds(cloudsArray);
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

  // Enhanced twinkling stars with varied colors for natural sky
  const renderTwinklingStars = () => {
    if (!stars) return null;
    return stars.filter(star => star?.id?.startsWith('twinkle')).map((star, index) => {
      // Create a proper style object with React animation properties
      const starStyle = {
        width: `${star.size}px`,
        height: `${star.size}px`,
        top: star.top,
        left: star.left,
        background: index % 5 === 0 ? '#FFFCEB' : index % 5 === 1 ? '#F8FBFF' : '#FFFFFF',
        boxShadow: `0 0 ${star.size + 2}px ${star.size}px rgba(255,255,255,0.9)`,
      };
      
      // Add animation properties if they exist
      if (star.animationDelay) {
        starStyle.animationDelay = star.animationDelay;
      }
      if (star.animationDuration) {
        starStyle.animationDuration = star.animationDuration;
      }
      
      return (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={starStyle}
        />
      );
    });
  };
  
  // Hero-specific sun rendering
  if (type === 'sun' && isHero) {
    return (
      <div
        ref={elementRef}
        className="absolute inset-0 transition-all duration-1000 ease-in-out opacity-0 overflow-hidden"
        style={{
          transform: `translate(${position === 'left' ? '-100%' : '100%'}, 0)`,
          pointerEvents: 'none'
        }}
      >
        {/* Enhanced hero sun */}
        <div className="absolute w-full h-full">
          {stars && stars.filter(star => star?.id?.startsWith('static')).map(star => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
                top: star.top,
                left: star.left,
                opacity: star.opacity * (1 - scrollProgress * 0.9), // Stars fade as you scroll - enhanced fade
                boxShadow: star.size > 1 ? `0 0 ${star.size + 1}px ${star.size - 1}px rgba(255,255,255,0.8)` : 'none'
              }}
            />
          ))}
        </div>
        
        {/* Hero-specific sunburst with enhanced natural appearance */}
        <div 
          className="absolute transition-all duration-1000 ease-out"
          style={{
            width: '150%', // Expanded for more natural coverage
            height: '150%', // Expanded for more natural coverage
            top: position === 'left' ? '-25%' : '-30%',
            left: position === 'left' ? '0%' : '-25%',
            opacity: 1 - scrollProgress * 0.8,
            zIndex: 2,
            transform: `rotate(${scrollProgress * 5}deg)` // Subtle rotation with scroll
          }}
        >
          <div className="relative w-full h-full">
            {/* Enhanced natural glow with realistic colors */}
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-yellow-100 via-yellow-200 to-transparent opacity-30 animate-pulse-slow"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-radial from-orange-100 via-amber-200 to-transparent opacity-20 animate-pulse-slow" 
                style={{ animationDelay: '0.5s', animationDuration: '7s' }}></div>
            <div className="absolute inset-0 rounded-full animate-spin-slow"
              style={{ 
                animationDuration: '120s',
                background: 'conic-gradient(from 0deg, rgba(255,215,0,0) 0%, rgba(255,235,0,0.1) 20%, rgba(255,215,0,0) 40%, rgba(255,245,0,0.1) 60%, rgba(255,215,0,0) 80%, rgba(255,235,0,0.1) 100%)'
              }}
            ></div>
          </div>
        </div>
        
        {/* Hero sun with rays - improved for natural appearance */}
        <div
          className={`absolute ${position === 'left' ? 'left-[5%]' : 'right-[5%]'} top-[15%] transition-all duration-1000 ease-out`}
          style={{
            width: '280px',
            height: '280px',
            transform: `scale(${1 - scrollProgress * 0.2}) translateY(${scrollProgress * 50}px)`,
            zIndex: 5
          }}
        >
          <div className="w-full h-full rounded-full relative overflow-visible">
            {/* Base sun with more natural gradient */}
            <div
              className="absolute inset-0 rounded-full animate-pulse-slow"
              style={{
                background: `radial-gradient(circle, 
                  rgba(255, 250, 235, 1) 0%, 
                  rgba(255, 225, 135, 1) 20%, 
                  rgba(255, 175, 75, 1) 70%, 
                  rgba(255, 140, 50, 0.8) 90%,
                  rgba(255, 140, 50, 0) 100%)`,
                boxShadow: `0 0 60px 30px rgba(255, 225, 135, 0.5),
                           0 0 100px 60px rgba(255, 175, 75, 0.3),
                           0 0 140px 90px rgba(255, 140, 50, 0.2)`,
                animationDuration: '4s'
              }}
            />
            
            {/* Sun rays with improved natural appearance */}
            <div className="absolute inset-[-60%] animate-spin-slow" style={{ animationDuration: '40s' }}>
              {[...Array(16)].map((_, i) => ( // More rays for natural look
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full origin-bottom"
                  style={{
                    height: i % 3 === 0 ? '100%' : i % 3 === 1 ? '85%' : '70%', // Varied heights for natural look
                    width: '4px',
                    transform: `rotate(${i * (360/16)}deg) translateY(-5%)`, // Even distribution
                    opacity: 0.7 + (i % 3) * 0.1 // Varied opacity for natural look
                  }}
                >
                  <div 
                    className="w-full h-full bg-gradient-to-t from-yellow-300 via-yellow-100 to-transparent rounded-full"
                    style={{ 
                      clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Center spotlight effect - enhanced for naturalism */}
            <div 
              className="absolute inset-[-30%] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%)',
                filter: 'blur(15px)',
                opacity: 0.8,
                mixBlendMode: 'soft-light'
              }}
            />
          </div>
        </div>
        
        {/* Natural atmospheric haze */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-sky-100/20 to-transparent pointer-events-none"></div>
      </div>
    );
  }

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
      {/* Enhanced starfield background */}
      <div className="absolute inset-0 w-full h-full">
        {/* More depth with varied star brightness */}
        {stars && stars.filter(star => star?.id?.startsWith('static')).map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              opacity: star.opacity * (type === 'moon' ? 0.9 : 0.7),
              boxShadow: star.size > 1 ? `0 0 ${star.size + 1}px ${star.size - 1}px rgba(255,255,255,${0.6 + star.opacity * 0.3})` : 'none'
            }}
          />
        ))}
        
        {/* Render twinkling stars using dedicated function */}
        {renderTwinklingStars()}
        
        {/* Enhanced deterministic shooting stars */}
        {shootingStars && shootingStars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              top: star.top,
              left: star.left,
              zIndex: 3,
              opacity: 0,
              '--angle': `${star.angle}deg`,
              '--y-offset': star.yOffset,
              animation: `enhanced-shooting-star ${star.duration} ease-out ${star.delay} infinite`,
            }}
          >
            {/* Main shooting star with natural glow */}
            <div 
              className="absolute"
              style={{
                width: `${star.tailLength}px`,
                height: `${star.size}px`,
                background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,1) 100%)',
                borderRadius: '50px',
                boxShadow: `0 0 ${star.size * 3}px ${star.size / 2}px rgba(255,255,255,0.6)`,
                opacity: star.opacity
              }}
            />
            
            {/* Natural trailing particles */}
            {star.particles && star.particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,1)',
                  boxShadow: `0 0 ${particle.size * 3}px ${particle.size}px rgba(255,255,255,0.8)`,
                  left: `-${particle.distance}px`,
                  top: `${Math.tan(particle.angle * Math.PI / 180) * particle.distance}px`,
                  opacity: 0,
                  '--opacity': particle.opacity.toString(),
                  animation: `fade-particle 0.8s ease-out infinite`,
                  animationDelay: `calc(${star.delay} + ${particle.delay})`,
                }}
              />
            ))}
          </div>
        ))}
        
        {/* Enhanced nebula/galaxy backgrounds */}
        <div className="absolute transition-all duration-1000 ease-in-out"
          style={{
            width: '50%',
            height: '60%',
            top: '5%',
            left: position === 'left' ? '60%' : '5%',
            background: type === 'moon' 
              ? 'radial-gradient(ellipse at center, rgba(100,120,200,0.2) 0%, rgba(70,90,150,0.1) 40%, rgba(100,50,200,0) 70%)'
              : 'radial-gradient(ellipse at center, rgba(255,200,100,0.1) 0%, rgba(255,150,50,0.05) 40%, rgba(255,100,0,0) 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)',
            transform: `rotate(${scrollProgress * 20}deg) scale(${1 + scrollProgress * 0.3})`,
            opacity: type === 'moon' ? (0.7 + scrollProgress * 0.3) : (0.5 - scrollProgress * 0.5)
          }}
        />
      </div>
      
      {/* Enhanced cloud formations */}
      {clouds && clouds.map((cloud, index) => (
        <div
          key={cloud.id}
          className="absolute"
          style={{
            width: `${cloud.size}px`,
            height: `${cloud.size * (0.5 + Math.random() * 0.3)}px`, // Varied heights for more natural clouds
            top: cloud.top,
            left: `${cloud.initialLeft}%`,
            opacity: type === 'sun' ? cloud.opacity : cloud.opacity * 0.3,
            background: index % 3 === 0 
              ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)'
              : index % 3 === 1
              ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 100%)'
              : 'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.65) 60%, rgba(255,255,255,0) 100%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            transform: `scale(${cloud.scale}) ${index % 2 === 0 ? 'scaleY(0.8)' : 'scaleY(0.9)'}`, // Flatter clouds for realism
            animation: `cloud-drift-${cloud.direction > 0 ? 'right' : 'left'} ${cloud.speed}s linear ${cloud.delay} infinite`,
            zIndex: 8
          }}
        />
      ))}
      
      {/* Fixed positioning for celestial bodies with improved appearance */}
      <div 
        className={`absolute ${position === 'left' ? 'left-[10%]' : 'right-[10%]'} ${type === 'sun' ? 'bottom-[10%]' : 'top-[10%]'} transition-all duration-1000 ease-out`}
        style={{
          width: type === 'sun' ? '200px' : '180px',
          height: type === 'sun' ? '200px' : '180px',
          transform: `translateY(${type === 'sun' ? scrollProgress * 30 : -scrollProgress * 30}%) scale(${type === 'sun' ? 1 - scrollProgress * 0.2 : 0.8 + scrollProgress * 0.3})`,
          zIndex: 5,
          animation: `float-${type} 10s ease-in-out infinite`
        }}
      >
        {/* Enhanced celestial body appearance */}
        <div 
          className="w-full h-full rounded-full relative overflow-hidden"
          style={{ 
            background: type === 'sun'
              ? `radial-gradient(circle, 
                  rgba(255, 250, 235, 1) 0%, 
                  rgba(255, 225, 135, 1) 15%, 
                  rgba(255, 175, 75, 1) 60%, 
                  rgba(255, 140, 50, 1) 100%)` // More natural sun colors
              : `radial-gradient(circle, 
                  rgba(248, 250, 253, 1) 0%, 
                  rgba(235, 240, 245, 1) 25%, 
                  rgba(220, 225, 230, 1) 50%, 
                  rgba(200, 205, 210, 1) 100%)`, // More natural moon colors
            boxShadow: type === 'sun'
              ? `0 0 60px 30px rgba(255, 225, 135, 0.5),
                 0 0 100px 60px rgba(255, 175, 75, 0.3),
                 0 0 140px 90px rgba(255, 140, 50, 0.2)`
              : `0 0 30px 10px rgba(235,240,245,0.4),
                 0 0 60px 30px rgba(220,225,230,0.2)`,
            transform: `rotate(${scrollProgress * (type === 'sun' ? 20 : 10)}deg)`,
            animation: `spin-${type} ${type === 'sun' ? '60s' : '80s'} linear infinite`
          }}
        >
          {/* Enhanced sun-specific surface features */}
          {type === 'sun' && (
            <>
              <div 
                className="absolute -inset-1/4 w-[150%] h-[150%] rounded-full animate-spin-slow"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(255,255,255,0) 40%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 60%)',
                  filter: 'blur(5px)',
                  opacity: 0.9,
                  animationDuration: '40s',
                  animationDirection: 'reverse'
                }}
              />
              
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden animate-pulse-slow">
                <div className="absolute inset-0 w-full h-full"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(255,170,0,0) 0deg 340deg, rgba(255,210,80,0.8) 345deg 355deg, rgba(255,170,0,0) 360deg)',
                    filter: 'blur(3px)'
                  }}
                />
              </div>
              
              {/* Subtle sun surface texture */}
              <div className="absolute inset-0 w-full h-full opacity-20"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.15\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.2\'/%3E%3C/svg%3E")',
                  mixBlendMode: 'overlay'
                }}
              />
            </>
          )}
          
          {/* Enhanced moon-specific surface features */}
          {type === 'moon' && (
            <>
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden opacity-40"
                style={{
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.1\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.3\'/%3E%3C/svg%3E")',
                  mixBlendMode: 'multiply'
                }}
              />
              
              {/* More natural moon shadow */}
              <div className="absolute inset-0 w-full h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(30,35,50,0.85) 0%, rgba(30,35,50,0.5) 50%, rgba(30,35,50,0) 100%)',
                  clipPath: `circle(50% at ${Math.max(0, 50 - scrollProgress * 50)}% 50%)`
                }}
              />
              
              {/* Subtle moon highlights */}
              <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden opacity-30"
                style={{
                  background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 20%)',
                  mixBlendMode: 'overlay'
                }}
              />
            </>
          )}
        </div>
      </div>
      
      {/* Enhanced cloud effect for sun with more natural appearance */}
      {type === 'sun' && (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div 
            className="absolute w-[150%] h-[70%] transition-all duration-1000 ease-in-out"
            style={{
              top: `${30 + scrollProgress * 40}%`,
              left: position === 'left' ? '5%' : '-55%',
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 10%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)',
              borderRadius: '50%',
              filter: 'blur(20px)',
              transform: `scale(${1 + scrollProgress * 0.7}) rotate(${scrollProgress * 10}deg)`,
              zIndex: 10
            }}
          />
          
          {/* Additional atmospheric effect for natural sky */}
          <div 
            className="absolute w-full h-[40%] bottom-0 transition-all duration-1000 ease-in-out"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
              opacity: 0.6,
              filter: 'blur(15px)'
            }}
          />
        </div>
      )}
      
      {/* Enhanced moon craters with more natural appearance */}
      {type === 'moon' && (
        <div className="absolute"
          style={{ 
            top: position === 'left' ? '10%' : '10%',
            left: position === 'left' ? '10%' : 'auto',
            right: position === 'left' ? 'auto' : '10%',
            width: '180px',
            height: '180px',
            opacity: 1,
            zIndex: 15,
            animation: 'float-moon 10s ease-in-out infinite'
          }}
        >
          {[...Array(20)].map((_, i) => { // More craters for natural appearance
            const size = 4 + (i % 5) * 4 + (i % 3) * 3; // Smaller, more varied sizes
            const depth = 1 + (i % 3);
            const topPos = (i * 7.3) % 90 + 5;
            const leftPos = (i * 11.7) % 90 + 5;
            
            return (
              <div 
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${topPos}%`,
                  left: `${leftPos}%`,
                  background: `radial-gradient(circle at ${30 + i % 40}% ${25 + i % 50}%, 
                    ${i % 3 === 0 ? '#E8E8E8' : i % 3 === 1 ? '#D8D8D8' : '#D0D0D0'} 0%, 
                    ${i % 3 === 0 ? '#B8B8B8' : i % 3 === 1 ? '#A8A8A8' : '#989898'} 80%)`,
                  boxShadow: `inset ${depth}px ${depth}px ${depth * 2}px rgba(30,35,50,0.5), 
                            inset -${depth}px -${depth}px ${depth * 2}px rgba(240,245,250,0.4)`,
                  opacity: 0.1 + scrollProgress * 0.9 // More visible as you scroll
                }}
              />
            );
          })}
          
          {/* Moon seas/maria for natural appearance */}
          {[...Array(3)].map((_, i) => {
            const size = 40 + i * 20;
            const topPos = 20 + (i * 25) % 50;
            const leftPos = 15 + (i * 30) % 60;
            
            return (
              <div 
                key={`maria-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size * 0.8}px`,
                  top: `${topPos}%`,
                  left: `${leftPos}%`,
                  background: `radial-gradient(circle, rgba(70,75,90,0.15) 0%, rgba(70,75,90,0) 80%)`,
                  opacity: 0.5 + scrollProgress * 0.3
                }}
              />
            );
          })}
        </div>
      )}

      {/* Add custom keyframes for more natural shooting star animation */}
      <style jsx>{`
        @keyframes natural-shooting-star {
          0% {
            opacity: 0;
            transform: rotate(var(--angle)) translateX(0) translateY(0);
          }
          1% {
            opacity: 1;
          }
          60% {
            opacity: 1;
            transform: rotate(var(--angle)) translateX(50vw) translateY(var(--y-offset));
          }
          100% {
            opacity: 0;
            transform: rotate(var(--angle)) translateX(100vw) translateY(var(--y-offset));
          }
        }
        
        @keyframes fade-particle {
          0% {
            opacity: 0;
          }
          30% {
            opacity: var(--opacity);
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CelestialBody;
