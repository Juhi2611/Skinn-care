import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#FDFCFB",
          100: "#F9F6F2",
          200: "#F1E9E0",
          300: "#E3D3C2",
          400: "#D1B69E",
          500: "#B89478",
          600: "#A17B5F",
          700: "#85644D",
          800: "#6A4F3D",
          900: "#533E31",
        },
        sage: {
          50: "#F6F7F6",
          100: "#EDEFED",
          200: "#D3D9D3",
          300: "#B9C2B9",
          400: "#869586",
          500: "#536853",
        },
        accent: {
          soft: "#FDF8F3",
          muted: "#E5E7EB",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "reveal": "reveal 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        reveal: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
