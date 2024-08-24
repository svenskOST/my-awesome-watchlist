import { useState, useEffect } from 'react'
import { context } from '../context/LoginProvider'
import { request } from '../helpers/request'
import Link from 'next/link'

export default function Navbar() {
   const { isLoggedIn, setIsLoggedIn } = context()
   const [username, setUsername] = useState('')

   useEffect(() => {
      // Authenticate
      request('/auth', 'POST').then(res => {
         setIsLoggedIn(res.ok)
      })
   }, [])

   useEffect(() => {
      if (isLoggedIn) {
         // Get username
         request('/auth').then(res => {
            if (res.ok) setUsername(res.json())
         })
      }
   }, [isLoggedIn])

   const handleLogout = () => {
      localStorage.removeItem('accessToken')
      setIsLoggedIn(false)
   }

   return (
      <nav>
         Navbar
         {isLoggedIn ? (
            <>
               {username}
               <Link href={'/browse'}>Browse</Link>
               <Link href={'/add'}>Add</Link>
               <button onClick={handleLogout}>Logout</button>
            </>
         ) : (
            <>
               <Link href={'/login'}>Login</Link>
               <Link href={'/register'}>Register</Link>
            </>
         )}
      </nav>
   )
}
