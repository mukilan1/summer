/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 4s infinite ease-in-out',
        'spin-slow': 'spin-slow 40s linear infinite',
        'twinkle': 'twinkle 3s infinite ease-in-out',
        'fade-in': 'fade-in 1s forwards',
        'moon-phase': 'moon-phase 3s ease-in-out forwards',
        'sun-cloud': 'sun-cloud 3s ease-in-out forwards',
        'text-glow': 'text-glow 2s infinite alternate',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: 0.8, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'moon-phase': {
          '0%': { clipPath: 'circle(50% at 0% 50%)', transform: 'scale(1)' },
          '100%': { clipPath: 'circle(50% at 50% 50%)', transform: 'scale(1.5)' }
        },
        'sun-cloud': {
          '0%': { transform: 'translateY(0) scale(1)', filter: 'brightness(1.2) drop-shadow(0 0 15px rgba(255, 200, 50, 0.8))' },
          '50%': { transform: 'translateY(15%) scale(1.2)', filter: 'brightness(0.9) drop-shadow(0 0 10px rgba(255, 200, 50, 0.5))' },
          '100%': { transform: 'translateY(30%) scale(1.3)', filter: 'brightness(0.7) drop-shadow(0 0 5px rgba(255, 200, 50, 0.3))' }
        },
        'text-glow': {
          '0%': { textShadow: '0 0 5px rgba(255, 255, 255, 0.5)' },
          '100%': { textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }
        }
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'subtitle': ['clamp(1.2rem, 3vw, 2rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.4)',
        'lg': '0 2px 10px rgba(0, 0, 0, 0.5)',
        'xl': '0 4px 12px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 8px rgba(255, 255, 255, 0.8)',
      },
      width: {
        'sun': 'clamp(150px, 18vw, 250px)',
        'moon': 'clamp(120px, 15vw, 220px)',
      },
      height: {
        'sun': 'clamp(150px, 18vw, 250px)',
        'moon': 'clamp(120px, 15vw, 220px)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
        'filter': 'filter',
        'clip-path': 'clip-path',
      },
      backgroundImage: {
        'sun-gradient': 'radial-gradient(circle, rgba(255,215,0,1) 0%, rgba(255,165,0,1) 60%, rgba(255,140,0,1) 100%)',
        'moon-gradient': 'radial-gradient(circle, rgba(230,230,230,1) 0%, rgba(210,210,210,1) 50%, rgba(180,180,180,1) 100%)',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 0 2px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.7), 0 0 3px rgba(0, 0, 0, 0.9)',
        },
        '.text-shadow-xl': {
          textShadow: '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 5px rgba(0, 0, 0, 1)',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 15px rgba(255, 255, 255, 0.5)',
        },
        '.text-shadow-hero': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 0 5px rgba(0, 0, 0, 1), 0 8px 24px rgba(0, 0, 0, 0.7)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
