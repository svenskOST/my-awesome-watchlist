import Link from 'next/link'
import { useAuth } from './AuthProvider'

export default function Navbar() {
   const { isLoggedIn, setIsLoggedIn } = useAuth()

   const handleLogout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      setIsLoggedIn(false)
   }
   return (
      <nav>
         Navbar
         {isLoggedIn ? (
            'Rendera element som användarnamn, profilbild, dropdownmeny med länkar'
         ) : (
            <>
               <Link href={'/login'}>Login</Link>
               <Link href={'/register'}>Register</Link>
            </>
         )}
      </nav>
   )
}