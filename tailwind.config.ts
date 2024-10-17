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
        fair_dark_blue: {
          50: "#E6ECF9",
          100: "#CED9F3",
          200: "#A1B6E8",
          300: "#7090DC",
          400: "#3F6ACF",
          500: "#2A4FA8",
          600: "#1E3A79",
          700: "#162B5A",
          800: "#0F1D3D",
          900: "#070E1D",
          950: "#040810",
        },
        fair_blue: {
          50: "#F0F4FA",
          100: "#E5EBF6",
          200: "#CBD8EC",
          300: "#ADC2E1",
          400: "#92AED8",
          500: "#789BCE",
          600: "#5C85C4",
          700: "#39619D",
          800: "#264169",
          900: "#132034",
          950: "#09101A",
        },
        fair_light_blue: {
          50: "#E5F9FF",
          100: "#CCF4FF",
          200: "#9EEAFF",
          300: "#6BDFFF",
          400: "#38D4FF",
          500: "#05C9FF",
          600: "#00A7D4",
          700: "#007C9E",
          800: "#00546B",
          900: "#002833",
          950: "#001419",
        },
        fair_yellow: {
          50: "#FFFCEB",
          100: "#FFFADB",
          200: "#FFF4B3",
          300: "#FFEE8F",
          400: "#FFE866",
          500: "#FFE342",
          600: "#FFDE1B",
          700: "#D1B200",
          800: "#8F7900",
          900: "#473D00",
          950: "#241E00",
        },
      },
    },
  },
  plugins: [],
};
export default config;
