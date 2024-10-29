/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
]
export const theme = {
  extend: {
    fontFamily: {
      kanitblack: ['kanit-black', ...defaultTheme.fontFamily.sans],
      kanitbold: ['kanit-bold', ...defaultTheme.fontFamily.sans],
      kanitmedium: ['kanit-medium', ...defaultTheme.fontFamily.sans],
    }
  },
}
export const plugins = []