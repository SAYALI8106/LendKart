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
          light: '#F7F4EC', // Warm Ivory
          dark: '#0E1714'   // Deep Forest Charcoal
        },
        surface: {
          light: '#FFFDF8', // Warm White
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
          secondary: '#A8C8B5',     // Soft Sage
          secondaryHover: '#8EAFA0',
          accent: '#C96F52',        // Warm Terracotta / Clay
          accentHover: '#B55E42',
          clayLight: '#FBEFEA',
          sky: '#86AFC4',           // Muted Sky
          lavender: '#B9A9D6',      // Muted Lavender
          charcoal: '#17201D',      // Deep Charcoal
          muted: '#5C6E66',         // Editorial Muted Charcoal
          sand: '#EFECE2'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Space Grotesk', 'Plus Jakarta Sans', 'sans-serif']
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
