/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F20162',
        'secondary': '#FF4444',
        'dark': '#0D0310',
        'grey': '#A9A9A940'
      },
      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'base': '14px',
        'md': '16px',
        'lg': '18px',
        '2lg': '20px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '42px'
      },
      borderRadius: {
        'xs': '6px',
        'sm': '8px',
        'md': '10px',
        'lg': '12px',
        '2lg': '14px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px'
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'floating': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(30px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'floating': 'floating 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

