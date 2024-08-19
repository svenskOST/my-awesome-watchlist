'use client'

import { useState } from 'react'
import Link from 'next/link'
import { fieldValidation, feedback, clear } from '../../helpers/formFunctions'
import TextControl from '../../components/TextControl'
import Submit from '../../components/Submit'

export default function Register() {
   const empty = {
      username: '',
      email: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)
   const [complete, setComplete] = useState(false)

   const allFieldsError = response => {
      feedback('username', response, setErrorMessages)
      feedback('email', response, setErrorMessages)
      feedback('password', response, setErrorMessages)
   }

   const handleSubmit = async e => {
      clear(setErrorMessages, empty)
      e.preventDefault()

      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation('username', 'Please choose a username', formData, setErrorMessages)
         fieldValidation('email', 'Please enter your email', formData, setErrorMessages)
         fieldValidation('password', 'Please choose a password', formData, setErrorMessages)

         return
      }

      try {
         const request = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })

         const response = await request.json()

         if (request.ok) {
            setFormData(empty)
            setComplete(true)
         } else
            switch (request.status) {
               case 409:
                  feedback('username', response, setErrorMessages)
                  break
               case 500:
                  allFieldsErr(response)
                  break
               case 400:
                  allFieldsErr(response)
                  break
            }
      } catch (error) {
         console.error(error)
         allFieldsError('Error')
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
               <TextControl
                  id='username'
                  type='text'
                  errorMessage={errorMessages.username}
                  value={formData.username}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='email'
                  type='email'
                  errorMessage={errorMessages.email}
                  value={formData.email}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='password'
                  type='new-password'
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
