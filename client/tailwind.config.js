/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
   content: ['./components/**/*.jsx', './app/**/*.jsx'],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
      },
   },
   plugins: [],
}

export default tailwindConfig
