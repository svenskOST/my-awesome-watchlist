'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fieldValidation, feedback, clear } from '../../helpers/formFunctions.js'
import TextControl from '../../components/TextControl'
import Submit from '../../components/Submit'

export default function Login() {
   const empty = {
      username: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)
   const router = useRouter()

   const handleSubmit = async e => {
      clear(setErrorMessages, empty)
      e.preventDefault()

      if (!formData.username || !formData.password) {
         fieldValidation(
            'username',
            'Please enter your username',
            formData,
            setErrorMessages
         )
         fieldValidation(
            'password',
            'Please enter your password',
            formData,
            setErrorMessages
         )

         return
      }

      try {
         const request = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })

         const response = await request.json()

         if (request.ok) {
            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.refreshToken)
            setFormData(empty)
            router.refresh()
            router.push('/')
         } else
            switch (request.status) {
               case 404:
                  feedback('username', response, setErrorMessages)
                  break
               case 401:
                  feedback('password', response, setErrorMessages)
                  break
               case 400:
                  feedback('username', response, setErrorMessages)
                  feedback('password', response, setErrorMessages)
                  break
            }
      } catch (error) {
         console.error(error)
         feedback('username', 'Error', setErrorMessages)
         feedback('password', 'Error', setErrorMessages)
      }
   }

   return (
      <main>
         <div>
            <h1>Login</h1>
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
                  id='password'
                  type='password'
                  errorMessage={errorMessages.password}
                  value={formData.password}
                  formData={formData}
                  setFormData={setFormData}
               />
               <Submit value='Login' />
            </form>
         </div>
      </main>
   )
}
