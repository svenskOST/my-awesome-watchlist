'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '../components/AuthProvider'
import Navbar from '../components/Navbar'

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
