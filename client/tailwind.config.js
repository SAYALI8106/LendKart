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
          light: '#F8F6F0', // Warm Ivory / Soft Sand
          dark: '#0E1714'   // Deep Forest Charcoal
        },
        surface: {
          light: '#FFFDF9',
          lightCard: '#FFFFFF',
          lightBorder: '#E7E2D6',
          dark: '#14211D',
          darkCard: '#192924',
          darkBorder: 'rgba(168, 200, 181, 0.12)'
        },
        brand: {
          primary: '#176B52',       // Deep Evergreen / Forest
          primaryHover: '#125440',  // Darker Forest
          primaryLight: '#E8F2ED',  // Tinted Sage White
          secondary: '#8EAFA0',     // Soft Sage
          secondaryHover: '#799A8B',
          accent: '#C96F52',        // Warm Terracotta / Clay
          accentHover: '#B55E42',
          clayLight: '#FBEFEA',
          sky: '#709DB3',           // Muted Dusty Sky
          lavender: '#A294BD',      // Soft Heather
          charcoal: '#17201D',      // Deep forest charcoal text
          muted: '#63736D',         // Soft sage charcoal text
          sand: '#F2EFE6'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif']
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(23, 32, 29, 0.04), 0 1px 2px rgba(23, 32, 29, 0.02)',
        'soft-md': '0 4px 16px -2px rgba(23, 32, 29, 0.06), 0 2px 6px -1px rgba(23, 32, 29, 0.04)',
        'soft-lg': '0 12px 32px -4px rgba(23, 32, 29, 0.08), 0 4px 12px -2px rgba(23, 32, 29, 0.04)',
        'forest-glow': '0 4px 20px -2px rgba(23, 107, 82, 0.25)',
        'terracotta-glow': '0 4px 20px -2px rgba(201, 111, 82, 0.25)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.35rem'
      }
    },
  },
  plugins: [],
}
