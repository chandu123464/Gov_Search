import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fja: {
          blue: "#0366d6",
          darkblue: "#094380",
          navy: "#0a2540",
          sky: "#eaf2fb",
          gold: "#f59e0b",
          green: "#059669",
          red: "#dc2626",
          darkred: "#991b1b",
          border: "#d0d7de",
          bg: "#f3f4f6",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;

