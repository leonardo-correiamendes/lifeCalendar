import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif "],
            },
            keyframes: {
                appear: {
                    "0%": { opacity: 0, transform: "scale(0.8)" },
                    "100%": { opacity: 1, transform: "scale(1)" },
                },
            },
            animation: {
                appear: "appear 0.3s ease-out forwards",
            },
        },
    },
    plugins: [],
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,ts,js}'],
    theme: { extend: {} },
    plugins: [],
};
