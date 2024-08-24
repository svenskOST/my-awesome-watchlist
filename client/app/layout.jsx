'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import LoginProvider from '../context/LoginProvider'
import Navbar from '../components/Navbar'

// Set a font for the application
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
   return (
      <>
         <head>
            <title>My Awesome Watchlist</title>
         </head>
         <LoginProvider>
            <html lang='en'>
               <body className={inter.className}>
                  <Navbar />
                  {children}
               </body>
            </html>
         </LoginProvider>
      </>
   )
}
