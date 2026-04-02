module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Google Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
  safelist: ["text-green-500", "text-red-500"],
};
