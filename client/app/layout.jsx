'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   return (
      <>
         <head>
            <title>My Awesome Watchlist</title>
         </head>
         <html lang='en'>
            <body className={inter.className}>
               <nav>
                  Navbar
                  {isLoggedIn ? (
                     'svenskOST'
                  ) : (
                     <>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'}>Register</Link>
                     </>
                  )}
               </nav>
               {children}
            </body>
         </html>
      </>
   )
}
