/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#070A0F',
          light: '#F8FAFC'
        },
        surface: {
          dark: '#10151D',
          darkCard: 'rgba(255, 255, 255, 0.04)',
          darkBorder: 'rgba(255, 255, 255, 0.08)',
          light: '#FFFFFF',
          lightCard: '#F1F5F9',
          lightBorder: '#E2E8F0'
        },
        brand: {
          primary: '#7C5CFF',
          primaryHover: '#6946F5',
          secondary: '#00D4FF',
          accent: '#B8FF6A',
          glow: 'rgba(124, 92, 255, 0.35)'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'neon-glow': '0 0 25px -5px rgba(124, 92, 255, 0.45)',
        'cyan-glow': '0 0 25px -5px rgba(0, 212, 255, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
