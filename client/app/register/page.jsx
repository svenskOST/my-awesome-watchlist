'use client'

import { useState } from 'react'
import Link from 'next/link'
import TextControl from '../components/TextControl'
import Submit from '../components/Submit'
import {
   handleChange,
   fieldValidation,
   feedback,
   clear,
} from '../helpers/formFunctions.js'

export default function Register() {
   const empty = {
      username: '',
      email: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)
   const [registrationComplete, setRegistrationComplete] = useState(false)

   const allFieldsError = data => {
      feedback('username', data, setErrorMessages)
      feedback('email', data, setErrorMessages)
      feedback('password', data, setErrorMessages)
   }

   const handleSubmit = async e => {
      clear(setErrorMessages, empty)
      e.preventDefault()

      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation(
            'username',
            'Please choose a username',
            formData,
            setErrorMessages
         )
         fieldValidation(
            'email',
            'Please enter your email',
            formData,
            setErrorMessages
         )
         fieldValidation(
            'password',
            'Please choose a password',
            formData,
            setErrorMessages
         )

         return
      }

      try {
         const response = await fetch(
            'http://localhost:5000/api/auth/register',
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData),
            }
         )

         const data = await response.json()

         if (response.ok) {
            setFormData(empty)
            setRegistrationComplete(true)
         } else
            switch (response.status) {
               case 409:
                  feedback('username', data, setErrorMessages)
                  break
               case 500:
                  allFieldsError(data)
                  break
               case 400:
                  allFieldsError(data)
                  break
            }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   return (
      <main>
         {registrationComplete ? (
            <div>
               <h2>Registration complete!</h2>
               <Link href={'/login'}>Login</Link>
            </div>
         ) : (
            <form onSubmit={handleSubmit}>
               <TextControl
                  id='username'
                  errorMessage={errorMessages.username}
                  type='text'
                  placeholder='Username'
                  value={formData.username}
                  auto='username'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='email'
                  errorMessage={errorMessages.email}
                  type='email'
                  placeholder='Email'
                  value={formData.email}
                  auto='email'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='password'
                  errorMessage={errorMessages.password}
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  auto='new-password'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />
               <Submit value='Create account' />
            </form>
         )}
      </main>
   )
}
