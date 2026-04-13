// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bg-slide": "bgSlide 6s ease infinite",
        float: "float 1s ease-in-out infinite",
        reveal: "revealText 1.5s ease-in-out forwards",
        slideUp: "slideUp 0.3s ease-out",
        shrinkDown: "shrinkDown 0.3s ease-in",
        fadeIn: "fadeIn 0.5s ease-out forwards", // 👈 added
        pulseZoom: "pulseZoom 1s ease-in-out infinite",
		
        fadeInUp: "fadeInUp 1s ease-out forwards",
		
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(100%) scale(0.95)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        shrinkDown: {
          "0%": { opacity: 1, transform: "translateY(0) scale(1)" },
          "100%": { opacity: 0, transform: "translateY(100%) scale(0.9)" },
        },
        bgSlide: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        revealText: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeIn: {
          // 👈 added
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
		  fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseZoom: {
          "0%,100%": {
            transform: "scale(1)",
            filter: "grayscale(100%) brightness(1)", // keep grayscale baseline
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          "50%": {
            transform: "scale(1.08)",
            filter: "grayscale(100%) brightness(1.25)", // combine filters so grayscale stays
            boxShadow: "0 0 20px rgba(0,0,0,0.18)",
          },
        },
      },
    },
  },
  plugins: [],
};
