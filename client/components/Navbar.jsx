import Link from 'next/link'
import { useAuth } from '../context/AuthProvider'
import { useEffect, useState } from 'react'

export default function Navbar() {
   const [username, setUsername] = useState('')
   const { isLoggedIn, setIsLoggedIn, authenticateToken } = useAuth()

   const fetchUsername = async () => {
      if (isLoggedIn) {
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
      } else {
         setUsername('error')
      }
   }

   const handleLogout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setIsLoggedIn(false)
   }

   useEffect(() => {
      authenticateToken()
         .then(result => {
            setIsLoggedIn(result)
         })
         .catch(console.error)
   }, [])

   useEffect(() => {
      setUsername(fetchUsername)
   }, [isLoggedIn])

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
