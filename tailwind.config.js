module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      kosugi: ['Lato', 'YakuHanJP', '"Kosugi Maru"', 'sans-serif'],
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'YakuHanJP', '"Hiragino Kaku Gothic ProN"', 'Meiryo'],
      },
      colors: {
        dclBackground: '#282a36',
        dclForeground: '#f8f8f2',
        dclCyan: '#8be9fd',
        dclYellow: '#f1fa8c',
        dclOrange: '#ffb86c',
        dclComment: '#6272a4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
