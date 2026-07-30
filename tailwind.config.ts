import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#12151A",
          900: "#181C22",
          700: "#2B313A",
          500: "#3E4C59",
          300: "#8A95A1",
          100: "#E7E9EC",
        },
        paper: "#F1EEE6",
        brass: {
          600: "#9C7A2E",
          500: "#B08D3F",
          400: "#C7A85C",
        },
        moss: {
          600: "#3F6B4F",
          100: "#E1EBE4",
        },
        signal: {
          600: "#B23A2E",
          100: "#F3E1DE",
        },
        amber: {
          600: "#B8862E",
          100: "#F5E9D6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        plate: ["var(--font-plate)", "monospace"],
      },
      borderRadius: {
        plate: "3px",
      },
    },
  },
  plugins: [],
};
export default config;
