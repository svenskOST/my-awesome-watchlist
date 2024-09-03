'use client'

import { createContext, useContext, useState } from 'react'

const FormContext = createContext()

export default function FormProvider({ children }) {
   const emptyFormData = {
      username: '',
      email: '',
      password: '',
   }

   // State to handle form data and error messages
   const [formData, setFormData] = useState(emptyFormData)
   const [errorMessages, setErrorMessages] = useState(emptyFormData)

   // State to handle completion status
   const [complete, setComplete] = useState(false)

   return (
      <FormContext.Provider
         value={{
            emptyFormData,
            formData,
            setFormData,
            errorMessages,
            setErrorMessages,
            complete,
            setComplete,
         }}
      >
         {children}
      </FormContext.Provider>
   )
}

export function useFormContext() {
   return useContext(FormContext)
}
