import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
   return (
      <>
         <head>
            <title>My Awesome Watchlist</title>
         </head>
         <html lang='en'>
            <body className={inter.className}>{children}</body>
         </html>
      </>
   )
}
