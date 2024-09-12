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
        background: "rgba(var(--background-color))",
        primaryColor: "rgba(var(--primary-color))",
        secondaryColor: "rgba(var(--secondary-color))",
        primaryTextColor: "rgba(var(--primary-text-color))",
        secondaryTextColor: "rgba(var(--secondary-text-color))",
        darkColor: "rgba(var(--dark-color))"
      },
    },
    fontFamily: {
      sans: ['var(--font-poppins)']
    }
  },
  plugins: [
    
  ],
};
export default config;
