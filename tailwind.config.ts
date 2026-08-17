import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Wired to the CSS variables in globals.css so these actually
        // respond to the [data-theme="light"] toggle instead of being
        // frozen at build time. The <alpha-value> placeholder lets
        // opacity modifiers keep working, e.g. bg-graphite-900/40.
        graphite: {
          950: "rgb(var(--graphite-950) / <alpha-value>)",
          900: "rgb(var(--graphite-900) / <alpha-value>)",
          800: "rgb(var(--graphite-800) / <alpha-value>)",
          700: "rgb(var(--graphite-700) / <alpha-value>)",
          600: "rgb(var(--graphite-600) / <alpha-value>)",
          500: "rgb(var(--graphite-500) / <alpha-value>)",
          400: "rgb(var(--graphite-400) / <alpha-value>)",
          300: "rgb(var(--graphite-300) / <alpha-value>)",
          200: "rgb(var(--graphite-200) / <alpha-value>)",
          100: "rgb(var(--graphite-100) / <alpha-value>)",
          50: "rgb(var(--graphite-50) / <alpha-value>)",
        },
        paper: "rgb(var(--paper) / <alpha-value>)",
        brass: {
          700: "rgb(var(--brass-700) / <alpha-value>)",
          600: "rgb(var(--brass-600) / <alpha-value>)",
          500: "rgb(var(--brass-500) / <alpha-value>)",
          400: "rgb(var(--brass-400) / <alpha-value>)",
          300: "rgb(var(--brass-300) / <alpha-value>)",
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
