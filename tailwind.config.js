/** @type {import('tailwindcss').Config} */
// import flowbitePlugin from 'flowbite/plugin';
// import tailwindForms from '@tailwindcss/forms';
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    // 'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    // 'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // tailwindForms
    // flowbitePlugin
  ],
}

