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
               <body>
                  <Navbar />
                  <main>{children}</main>
               </body>
            </html>
         </LoginProvider>
      </>
   )
}
