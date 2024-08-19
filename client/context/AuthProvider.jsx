import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const authenticateToken = async () => {
      try {
         const accessToken = localStorage.getItem('accessToken')

         const request = await fetch('http://localhost:4000/auth/authenticate', {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
         })

         if (request.ok) {
            return true
         } else {
            return false
         }
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, authenticateToken }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   return useContext(AuthContext)
}
