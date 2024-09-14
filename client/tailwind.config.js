/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
   content: ['./components/**/*.jsx', './app/**/*.jsx'],
   theme: {
      colors: {
         neutral: {
            // 'bg-neutral-500'
            100: 'hsl(220, 18%, 98%)',
            200: 'hsl(220, 16%, 95%)',
            300: 'hsl(220, 14%, 92%)',
            400: 'hsl(220, 12%, 84%)',
            500: 'hsl(220, 10%, 71%)',
            600: 'hsl(220, 12%, 56%)',
            700: 'hsl(220, 14%, 32%)',
            800: 'hsl(220, 16%, 23%)',
            900: 'hsl(220, 18%, 15%)',
         },
         primary: {
            100: 'hsl(270, 100%, 80%)',
            200: 'hsl(270, 90%, 72%)',
            300: 'hsl(270, 80%, 58%)',
            400: 'hsl(270, 60%, 43%)',
            500: 'hsl(270, 55%, 35%)',
            600: 'hsl(270, 60%, 30%)',
            700: 'hsl(270, 80%, 23%)',
            800: 'hsl(270, 90%, 15%)',
            900: 'hsl(270, 100%, 10%)',
         },
         accent: {
            green: {
               // 'bg-accent-green-500'
               100: 'hsl(135, 70%, 70%)',
               300: 'hsl(135, 65%, 56%)',
               500: 'hsl(135, 60%, 39%)',
               700: 'hsl(135, 65%, 34%)',
               900: 'hsl(135, 70%, 28%)',
            },
            red: {
               100: 'hsl(355, 85%, 40%)',
               300: 'hsl(355, 83%, 35%)',
               500: 'hsl(355, 80%, 30%)',
               700: 'hsl(355, 85%, 25%)',
               900: 'hsl(355, 90%, 20%)',
            },
            yellow: {
               100: 'hsl(50, 90%, 70%)',
               300: 'hsl(50, 85%, 60%)',
               500: 'hsl(50, 80%, 50%)',
               700: 'hsl(48, 85%, 45%)',
               900: 'hsl(48, 90%, 40%)',
            },
         },
      },
      fontSize: {
         // 'text-300'
         100: '.75rem',
         200: '.875rem',
         300: '1rem',
         400: '1.125rem',
         500: '1.25rem',
         600: '1.5rem',
         700: '1.875rem',
         800: '2.25rem',
         900: '3rem',
      },
      fontFamily: {
         // 'font-inter'
         inter: 'var(--font-inter)',
      },
      fontWeight: {
         // 'weight-400'
         100: 100,
         200: 200,
         300: 300,
         400: 400,
         500: 500,
         600: 600,
         700: 700,
         800: 800,
         900: 900,
      },
      lineHeight: {
         // 'line-base'
         none: 1,
         tight: 1.25,
         base: 1.5,
         loose: 1.75,
         much: 2,
      },
      letterSpacing: {
         // 'spacing-base'
         tight: '-.1em',
         base: '0',
         wider: '.1em',
         widest: '.4em',
      },
      spacing: {
         // 'w/h/m/p-4'
         0: 0,
         1: '.25rem',
         2: '.5rem',
         3: '.75rem',
         4: '1rem',
         5: '1.5rem',
         6: '2rem',
         7: '3rem',
         8: '4rem',
         9: '6rem',
         10: '8rem',
         11: '12rem',
         12: '16rem',
         13: '24rem',
         14: '32rem',
         15: '40rem',
         16: '48rem',
      },
      borderWidth: {
         // 'border-base'
         none: '0',
         thin: '.0625rem',
         base: '.125rem',
         thick: '.25rem',
      },
      depthEffect: {
         raised: {
            1: '0 -2px 0 var(--tw-shadow-color), 0 1px 1px hsla(0, 0%, 0%, .5)',
            2: '0 -3px 0 var(--tw-shadow-color), 0 2px 2px hsla(0, 0%, 0%, .5)',
            3: '0 -4px 0 var(--tw-shadow-color), 0 3px 3px hsla(0, 0%, 0%, .5)',
            4: '0 -5px 0 var(--tw-shadow-color), 0 4px 4px hsla(0, 0%, 0%, .5)',
            5: '0 -6px 0 var(--tw-shadow-color), 0 5px 5px hsla(0, 0%, 0%, .5)',
         },
         lowered: {
            1: 'inset 0 -1px 0 var(--tw-shadow-color), inset 0 1px 1px hsla(0, 0%, 0%, .5)',
            2: 'inset 0 -2px 0 var(--tw-shadow-color), inset 0 2px 2px hsla(0, 0%, 0%, .5)',
            3: 'inset 0 -3px 0 var(--tw-shadow-color), inset 0 3px 3px hsla(0, 0%, 0%, .5)',
            4: 'inset 0 -4px 0 var(--tw-shadow-color), inset 0 4px 4px hsla(0, 0%, 0%, .5)',
            5: 'inset 0 -5px 0 var(--tw-shadow-color), inset 0 5px 5px hsla(0, 0%, 0%, .5)',
         },
      },
   },
   corePlugins: {
      lineHeight: false,
      fontWeight: false,
      letterSpacing: false,
      boxShadow: false,
   },
   plugins: [
      function ({ addUtilities, e, theme, variants }) {
         const lineHeights = theme('lineHeight')
         const fontWeights = theme('fontWeight')
         const letterSpacings = theme('letterSpacing')
         const depthEffects = theme('depthEffect')

         const lineUtilities = Object.keys(lineHeights).map(key => ({
            [`.line-${e(key)}`]: { lineHeight: lineHeights[key] },
         }))
         const weightUtilities = Object.keys(fontWeights).map(key => ({
            [`.weight-${e(key)}`]: { fontWeight: fontWeights[key] },
         }))
         const spacingUtilities = Object.keys(letterSpacings).map(key => ({
            [`.spacing-${e(key)}`]: { letterSpacing: letterSpacings[key] },
         }))
         const raisedUtilities = Object.keys(depthEffects.raised).map(key => ({
            [`.raised-${e(key)}`]: { boxShadow: depthEffects.raised[key] },
         }))
         const loweredUtilities = Object.keys(depthEffects.lowered).map(key => ({
            [`.lowered-${e(key)}`]: { boxShadow: depthEffects.lowered[key] },
         }))

         addUtilities(lineUtilities, variants('lineHeight'))
         addUtilities(weightUtilities, variants('fontWeight'))
         addUtilities(spacingUtilities, variants('letterSpacings'))
         addUtilities(raisedUtilities, variants('raisedEffects'))
         addUtilities(loweredUtilities, variants('loweredEffects'))
      },
   ],
}

export default tailwindConfig
