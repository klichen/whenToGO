/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: 'true',
    },
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        spin: 'spin 200ms forwards',
      },
      backgroundImage: {
        trains: "url('/src/assets/trains_background.png')",
      },
      backgroundPosition: {
        'left-middle': 'left top 2rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        gogreen: '#42631c',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
};
