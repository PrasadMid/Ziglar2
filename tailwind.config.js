module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Make sure content is included
  theme: {
    screens: {
      xsm: "320px",
      galaxyz: "344px",
      gals8: "360px",
      xs: "375px",
      iphone12: "390px",
      pixel7: "412px",
      xss: "414px",
      mxs: "425px",
      iphone14: "430px",
      surfaceduo: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "2xl": "2560px",
      "3xl": "1519px",
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        slideIn: "slideIn 0.7s ease-out",
      },
      placeholder: {
        xsm: "text-xs",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-4xl",
      },
    },
  },
  plugins: [],
};
