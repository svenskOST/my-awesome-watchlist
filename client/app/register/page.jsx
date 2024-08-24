'use client'

import { useState } from 'react'
import { fieldValidation, feedback, clear } from '../../helpers/formFunctions'
import Link from 'next/link'
import TextControl from '../../components/TextControl'
import Submit from '../../components/Submit'

export default function Register() {
   // Initial empty form data
   const emptyFormData = {
      username: '',
      email: '',
      password: '',
   }

   // State to manage form data, error messages, and completion status
   const [formData, setFormData] = useState(emptyFormData)
   const [errorMessages, setErrorMessages] = useState(emptyFormData)
   const [complete, setComplete] = useState(false)

   // Function to handle validation errors for all fields
   const handleAllFieldsError = response => {
      feedback('username', response, setErrorMessages)
      feedback('email', response, setErrorMessages)
      feedback('password', response, setErrorMessages)
   }

   // Handle form submission
   const handleSubmit = async e => {
      e.preventDefault()

      // Clear previous error messages
      clear(setErrorMessages, emptyFormData)

      // Validate input fields
      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation('username', 'Please choose a username', formData, setErrorMessages)
         fieldValidation('email', 'Please enter your email', formData, setErrorMessages)
         fieldValidation('password', 'Please choose a password', formData, setErrorMessages)
         return
      }

      // Attempt to register the user
      try {
         const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })
         const data = await response.json()

         if (response.ok) {
            setComplete(true) // Registration successful
         } else {
            handleErrorResponse(response.status, data)
         }
      } catch (error) {
         console.error('Registration failed:', error)
         handleAllFieldsError('Unknown error occurred')
      }
   }

   // Handle specific error responses based on status codes
   const handleErrorResponse = (status, data) => {
      switch (status) {
         case 409:
            feedback('username', data, setErrorMessages)
            break
         case 500:
         case 400:
            handleAllFieldsError(data)
            break
         default:
            handleAllFieldsError('An unexpected error occurred')
            break
      }
   }

   return (
      <main>
         {complete ? (
            <div>
               <h2>Registration complete!</h2>
               <Link href={'/login'}>Login</Link>
            </div>
         ) : (
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

               {/* Email field */}
               <TextControl
                  id='email'
                  type='email'
                  errorMessage={errorMessages.email}
                  value={formData.email}
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

               <Submit value='Create account' />
            </form>
         )}
      </main>
   )
}
