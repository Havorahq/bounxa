import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   background: "var(--background)",
      //   foreground: "var(--foreground)",
      // },
    },
    screens: {
      'xl': '1280px',
      'lg': '1024px',
      'tablet': '850px',
      'md': '768px',
      'sm': '640px',
      'phone': '450px'
    },
    fontFamily: {
      urbanist: ['var(--font-urbanist)'],
    }
  },

  plugins: [],
};
export default config;
