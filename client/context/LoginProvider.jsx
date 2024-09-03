import { createContext, useContext, useState } from 'react'

const LoginContext = createContext()

export default function LoginProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(null)

   return (
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
         {children}
      </LoginContext.Provider>
   )
}

export function useLoginContext() {
   return useContext(LoginContext)
}
