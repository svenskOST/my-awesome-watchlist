import { createContext, useContext, useState } from 'react'

const LoginContext = createContext()

export default function LoginProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false)

   return (
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
         {children}
      </LoginContext.Provider>
   )
}

export function context() {
   return useContext(LoginContext)
}
