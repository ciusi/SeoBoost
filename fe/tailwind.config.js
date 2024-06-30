module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        main: '#005e64',
        'main-dark': '#373431',
        background: '#e6e6dd',
        complementary: '#ffffff',
        gold: '#daa520',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        anton: ['Anton', 'sans-serif'],
        spartan: ['League Spartan', 'sans-serif'],
      },
      keyframes: {
        loader: {
          '0%, 100%': { opacity: 0 },
          '33%': { opacity: 1 },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
