/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // KDS Color System
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#1d4ed8',
        },
        accent: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b', 
        danger: '#ef4444',
        
        // KDS Backgrounds
        bg: {
          primary: '#0a0a0a',
          secondary: '#111111',
          tertiary: '#1a1a1a',
          card: '#161616',
          elevated: '#1f1f1f',
        },
        
        // KDS Text Colors  
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
          tertiary: '#737373',
          muted: '#525252',
        },
        
        // KDS Borders
        border: {
          primary: '#262626',
          secondary: '#404040',
          accent: 'rgba(59, 130, 246, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 0 1px rgba(59, 130, 246, 0.1), 0 4px 16px rgba(59, 130, 246, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
      }
    },
  },
  plugins: [],
}