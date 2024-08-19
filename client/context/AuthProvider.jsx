import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   const authenticate = () => {
      const accessToken = localStorage.getItem('accessToken')
      setIsLoggedIn(!!accessToken)
   }

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, authenticate }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   return useContext(AuthContext)
}
