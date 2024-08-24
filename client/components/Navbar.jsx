import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'
import { authenticateToken } from '../helpers/authenticateToken'
import Link from 'next/link'

export default function Navbar() {
   // State for user data
   const [username, setUsername] = useState('')

   // Access context
   const { isLoggedIn, setIsLoggedIn } = useAuth()

   // Perform a control to see if user is logged in
   useEffect(() => {
      authenticateToken()
         .then(result => {
            setIsLoggedIn(result)
         })
         .catch(console.error)
   }, [])

   useEffect(() => {
      const fetchUsername = async () => {
         if (isLoggedIn) {
            // Attempt to fetch username
            try {
               const accessToken = localStorage.getItem('accessToken')

               const request = await fetch('http://localhost:4000/auth', {
                  headers: { Authorization: `Bearer ${accessToken}` },
               })
               const response = request.json()

               if (request.ok) {
                  setUsername(response)
               }
            } catch (error) {
               console.error(error)
            }
         }
      }

      fetchUsername()
   }, [isLoggedIn])

   const handleLogout = () => {
      // Remove token from storage
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
