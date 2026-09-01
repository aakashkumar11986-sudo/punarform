/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — calm, trustworthy blues and greens
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd9ff',
          300: '#8ec1ff',
          400: '#599dff',
          500: '#3479fb',
          600: '#1f5af0',
          700: '#1846dc',
          800: '#1939b3',
          900: '#1a338d',
        },
        mint: {
          50: '#effbf6',
          100: '#d7f5e9',
          200: '#b0e9d4',
          300: '#7dd6b8',
          400: '#48bd97',
          500: '#22a27c',
          600: '#138265',
          700: '#106852',
          800: '#0f5343',
          900: '#0d4538',
        },
        sand: {
          50: '#fbf9f4',
          100: '#f5f0e4',
          200: '#eae0c7',
          300: '#ddca9d',
          400: '#ccb074',
          500: '#bf9a57',
        },
        // Semantic
        success: '#22a27c',
        warning: '#e0992a',
        danger: '#c0563a',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(20, 60, 120, 0.06), 0 8px 24px -12px rgba(20, 60, 120, 0.12)',
        'card-hover': '0 2px 8px rgba(20, 60, 120, 0.08), 0 16px 40px -16px rgba(20, 60, 120, 0.2)',
        soft: '0 1px 2px rgba(20, 60, 120, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
