module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '2rem',
        },
      },
      colors: {
        black: '#333',
        'accent-1': '#333',
        'gray-100': '#f5f5f5',
        'gray-200': '#dfdfdf',
        'gray-300': '#cccccc',
        'gray-400': '#999999',
        'gray-600': '#565656',
        'gray-900': '#050042',
        'blue-300': '#A6DAFF',
        'green-500': '#53B743',
      },
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus'],
    },
  },
  plugins: [],
}
