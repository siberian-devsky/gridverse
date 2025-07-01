/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '.dark'],
  theme: {
    extend: {
      keyframes: {
        slideright: {
          from: { transform: 'translateX(0px)' },
          to: { transform: 'translateX(125px)' }
        },
        slideleft: {
          from: { transform: 'translateX(125px)' },
          to: { transform: 'translateX(0px)' }
        }
      },
      animation: {
        slideright: 'slideright 750ms ease-out forwards',
        slideleft: 'slideleft 750ms ease-in forwards'
      }
    }
  }
}
export default config