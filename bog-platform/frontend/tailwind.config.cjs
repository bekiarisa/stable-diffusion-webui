const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344'
        },
        abyss: '#020617',
        glow: '#38f8ff'
      },
      fontFamily: {
        sans: ['"Urbanist"', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'ocean-gradient': 'radial-gradient(circle at 20% 20%, rgba(56,248,255,0.2), transparent 45%), radial-gradient(circle at 80% 30%, rgba(34,211,238,0.2), transparent 55%), linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%)'
      },
      boxShadow: {
        glow: '0 0 30px rgba(56,248,255,0.45)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
