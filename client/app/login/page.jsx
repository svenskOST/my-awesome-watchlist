'use client'

import { useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import { useRouter } from 'next/navigation'
import { fieldValidation, feedback, clear } from '../../helpers/formFunctions'
import { authenticateToken } from '../../helpers/authenticateToken'
import TextControl from '../../components/TextControl'
import Submit from '../../components/Submit'

export default function Login() {
   // Initial empty form data
   const emptyFormData = {
      username: '',
      password: '',
   }

   // State for form data and error messages
   const [formData, setFormData] = useState(emptyFormData)
   const [errorMessages, setErrorMessages] = useState(emptyFormData)

   // Access context and router
   const { setIsLoggedIn } = useAuth()
   const router = useRouter()

   // Handle form submission
   const handleSubmit = async e => {
      e.preventDefault()

      // Clear previous error messages
      clear(setErrorMessages, emptyFormData)

      // Validate fields
      if (!formData.username || !formData.password) {
         fieldValidation('username', 'Please enter your username', formData, setErrorMessages)
         fieldValidation('password', 'Please enter your password', formData, setErrorMessages)
         return
      }

      // Send login request
      try {
         const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })
         const data = await response.json()

         if (response.ok) {
            // Store token in local storage
            localStorage.setItem('accessToken', data.accessToken)

            // Authenticate the token and redirect user if successful
            const authenticated = await authenticateToken()
            if (authenticated) {
               setIsLoggedIn(true)
               router.back()
            }
         } else {
            handleErrorResponse(response.status, data)
         }
      } catch (error) {
         console.error('Login failed:', error)
         feedback('username', 'Unknown error occurred', setErrorMessages)
         feedback('password', 'Unknown error occurred', setErrorMessages)
      }
   }

   // Handle specific error responses based on status codes
   const handleErrorResponse = (status, data) => {
      switch (status) {
         case 404:
            feedback('username', data, setErrorMessages)
            break
         case 401:
            feedback('password', data, setErrorMessages)
            break
         case 400:
            feedback('username', data, setErrorMessages)
            feedback('password', data, setErrorMessages)
            break
         default:
            feedback('username', 'An unexpected error occurred', setErrorMessages)
            feedback('password', 'An unexpected error occurred', setErrorMessages)
      }
   }

   return (
      <main>
         <h1>Login</h1>
         <form onSubmit={handleSubmit}>
            {/* Username field */}
            <TextControl
               id='username'
               type='text'
               errorMessage={errorMessages.username}
               value={formData.username}
               formData={formData}
               setFormData={setFormData}
            />

            {/* Password field */}
            <TextControl
               id='password'
               type='password'
               errorMessage={errorMessages.password}
               value={formData.password}
               formData={formData}
               setFormData={setFormData}
            />

            <Submit value='Login' />
         </form>
      </main>
   )
}
