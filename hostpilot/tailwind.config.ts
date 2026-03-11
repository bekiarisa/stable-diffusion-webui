import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          600: '#1769ff',
          700: '#1455cc',
          900: '#0c255c',
        },
      },
      boxShadow: {
        soft: '0 10px 35px rgba(13, 41, 98, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
