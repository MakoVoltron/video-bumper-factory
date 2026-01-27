import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg))",
        fg: "rgb(var(--fg))",
        border: "rgb(var(--border))",
      },
      fontFamily: {
        headline: ["var(--font-headline)"],
      },
    },
  },
  plugins: [],
};

export default config;
