module.exports = {
  'src/**/*.{js,jsx,ts,tsx}': [
    'eslint --max-warnings=0',
    // () => 'tsc-files --noEmit',
  ],
  'src/**/*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
  '!src/**/*.{test.js,test.jsx,test.ts,test.tsx}': [],
}
