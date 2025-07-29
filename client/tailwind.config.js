/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  safelist: [
    // Background colors
    "bg-red-100",
    "bg-blue-100",
    "bg-gray-100",
    "bg-amber-100",
    "bg-emerald-100",
    "bg-red-400",
    // Text colors
    "text-red-800",
    "text-blue-800",
    "text-gray-800",
    "text-amber-800",
    "text-emerald-800",
    "text-red-400",
    // Dark mode backgrounds
    "dark:bg-red-900/30",
    "dark:bg-blue-900/30",
    "dark:bg-gray-600",
    "dark:bg-amber-900/30",
    "dark:bg-emerald-900/30",
    // Dark mode text
    "dark:text-red-300",
    "dark:text-blue-300",
    "dark:text-gray-300",
    "dark:text-amber-300",
    "dark:text-emerald-300",
  ],
  theme: {
    extend: {
      colors: {
        card: 'var(--card)',
        'stat-total': '#147df5ff', // light blue
        'stat-completed': '#0df55eff', // light green
        'stat-pending': '#f5c30cff', // light amber
        'stat-highpriority': '#f62828ff', // light red
      },
    },
  },
  plugins: [],
};
