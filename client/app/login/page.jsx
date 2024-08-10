'use client'

import { useState } from 'react'
import TextControl from '../components/TextControl'
import Submit from '../components/Submit'
import {
   handleChange,
   fieldValidation,
   feedback,
   clear,
} from '../helpers/formFunctions.js'

export default function Login() {
   const empty = {
      username: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errorMessages, setErrorMessages] = useState(empty)

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
         const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })

         const data = await response.json()

         if (response.ok) {
            localStorage.setItem('userid', data.userid)
            setFormData(empty)
         } else
            switch (response.status) {
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
            }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   return (
      <main>
         <div>
            <h1>Login</h1>
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
                  id='password'
                  errorMessage={errorMessages.password}
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  auto='password'
                  handleChange={handleChange}
                  formData={formData}
                  setFormData={setFormData}
               />
               <Submit value='Login' />
            </form>
         </div>
      </main>
   )
}
