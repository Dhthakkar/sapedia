import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:     "#0070F2",
          "blue-d": "#0057C2",
          "blue-l": "#EBF4FF",
          "blue-pl":"#F0F7FF",
          navy:     "#0B1829",
          navy2:    "#0F2746",
        },
        content: {
          concept:  "#EBF4FF",
          example:  "#EDFAF1",
          exam:     "#FFFBEA",
          mistake:  "#FEF2F2",
          jargon:   "#F3F0FF",
          support:  "#FFF8F0",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body:    ["Plus Jakarta Sans", "sans-serif"],
      },
      animation: {
        "fade-up":  "fadeUp 0.45s ease forwards",
        "fade-in":  "fadeIn 0.3s ease forwards",
        "scale-in": "scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards",
        float:      "float 3.2s ease-in-out infinite",
        pulse2:     "pulse2 2s ease infinite",
        "grad-flow":"gradFlow 4s ease infinite",
        shimmer:    "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp:   { from:{ opacity:"0", transform:"translateY(18px)" }, to:{ opacity:"1", transform:"translateY(0)" } },
        fadeIn:   { from:{ opacity:"0" }, to:{ opacity:"1" } },
        scaleIn:  { from:{ opacity:"0", transform:"scale(0.92)" }, to:{ opacity:"1", transform:"scale(1)" } },
        float:    { "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-7px)" } },
        pulse2:   { "0%,100%":{ opacity:"1" }, "50%":{ opacity:"0.5" } },
        gradFlow: { "0%,100%":{ backgroundPosition:"0% 50%" }, "50%":{ backgroundPosition:"100% 50%" } },
        shimmer:  { "0%":{ backgroundPosition:"-200% 0" }, "100%":{ backgroundPosition:"200% 0" } },
      },
      boxShadow: {
        "sh-sm": "0 2px 8px rgba(0,0,0,0.07)",
        "sh-md": "0 4px 20px rgba(0,0,0,0.09)",
        "sh-lg": "0 12px 48px rgba(0,0,0,0.14)",
        "sh-xl": "0 24px 80px rgba(0,0,0,0.18)",
        "sh-blue":"0 8px 32px rgba(0,112,242,0.22)",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "18px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};

export default config;
