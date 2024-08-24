'use client'

import './globals'
import { Inter } from 'next/font/google'
import { AuthProvider } from '../context/AuthProvider'
import Navbar from '../components/Navbar'

// Set a font for the application
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
   return (
      <>
         <head>
            <title>My Awesome Watchlist</title>
         </head>
         <AuthProvider>
            <html lang='en'>
               <body className={inter.className}>
                  <Navbar />
                  {children}
               </body>
            </html>
         </AuthProvider>
      </>
   )
}
