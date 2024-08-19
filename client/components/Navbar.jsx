import Link from 'next/link'
import { useAuth } from '../context/AuthProvider'
import { useEffect } from 'react'

export default function Navbar() {
   const { isLoggedIn, setIsLoggedIn } = useAuth()
   const { authenticateToken } = useAuth()

   const handleLogout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setIsLoggedIn(false)
   }

   useEffect(() => {
      const checkAuthentication = async () => {
         const authenticated = await authenticateToken()
         setIsLoggedIn(authenticated)
      }

      checkAuthentication()
   }, [])

   return (
      <nav>
         Navbar
         {isLoggedIn ? (
            <>
               Rendera element som användarnamn, profilbild, dropdownmeny med länkar
               <button onClick={handleLogout}>Logout</button>
            </>
         ) : (
            <>
               <Link href={'/login'}>Login</Link>
               <Link href={'/register'}>Register</Link>
            </>
         )}
         <button
            onClick={() => {
               console.log(localStorage.getItem('accessToken'))
            }}
         >
            Log
         </button>
      </nav>
   )
}
