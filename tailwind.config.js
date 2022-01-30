module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      lightGrey: '#F7F7F7',
      grey: '#F6F7F8',
      grey300: '#8C8C8C',
      grey200: '#878A8C',
      grey100: '#7C7C7C',
      black: '#000',
      white: '#fff',
    },
    fontSize: {
      xs: '0.9em',
      sm: '1em',
      md: '1.2em',
      lg: '1.5em',
    },
    screens: {
      sm: '380px',
      md: '420px',
      lg: '680px',
    },
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
