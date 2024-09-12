'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import LoginProvider from '../context/LoginProvider'
import Navbar from '../components/Navbar'

// Set a font for the application
const inter = Inter({
   subsets: ['latin'],
   display: 'swap',
   variable: '--font-inter',
})

export default function RootLayout({ children }) {
   return (
      <>
         <head>
            <title>My Awesome Watchlist</title>
         </head>
         <LoginProvider>
            <html lang='en' className={`${inter.variable}`}>
               <body className='text-justify hyphens-auto spacing-base select-none bg-neutral-100 line-base font-inter weight-400 text-300 text-neutral-900'>
                  <Navbar />
                  <main>{children}</main>
               </body>
            </html>
         </LoginProvider>
      </>
   )
}
