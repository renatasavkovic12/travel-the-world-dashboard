/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customBg: 'var(--bg-page)',
        customCard: 'var(--bg-card)',
        customText: 'var(--text-main)',
        customMuted: 'var(--text-muted)',
        customPrimary: 'var(--primary)',
        customBorder: 'var(--border)',
      }
    },
  },
  plugins: [],
}

