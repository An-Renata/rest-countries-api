/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito Sans", "sans-serif"], // override default fontFamily
      },
      boxShadow: {
        "card-shadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      },
      colors: {
        darkModeElement: "hsl(209, 23%, 22%)",
        darkModeBackground: "hsl(207, 26%, 17%)",
        lightModeInput: "hsl(0, 0%, 52%)",
        lightModeBackground: "hsl(0, 0%, 98%)",
        lightModeElement: "hsl(0, 0%, 100%)",
        lightModeText: "hsl(200, 15%, 8%)",
        darkModeText: "hsl(0, 0%, 100%)",
      },
    },
  },
  plugins: [],
};

// - Dark Blue (Dark Mode Elements): 	#5E3917
// - Very Dark Blue (Dark Mode Background): #372A20
// - Very Dark Blue (Light Mode Text): #171311
// - Dark Gray (Light Mode Input): #858585
// - Very Light Gray (Light Mode Background): #FAFAFA
// - White (Dark Mode Text & Light Mode Elements): #FFFFFF
