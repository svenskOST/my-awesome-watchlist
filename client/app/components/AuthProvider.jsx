import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   useEffect(() => {
      const accessToken = localStorage.getItem('accessToken')
      console.log(accessToken)
      setIsLoggedIn(!!accessToken)
   }, [])

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
         {children}
      </AuthContext.Provider>
   )
}

export function useAuth() {
   return useContext(AuthContext)   
}
