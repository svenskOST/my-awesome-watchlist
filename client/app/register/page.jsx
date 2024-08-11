'use client'

import useState from 'react'
import Link from 'next/link'
import TextControl from '../components/TextControl'
import Submit from '../components/Submit'
import { fieldValidation, feedback, clear } from '../helpers/formFunctions.js'

export default function Register() {
   const empty = {
      username: '',
      email: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errMsgs, setErrMsgs] = useState(empty)
   const [complete, setComplete] = useState(false)

   const allFieldsErr = res => {
      feedback('username', res, setErrMsgs)
      feedback('email', res, setErrMsgs)
      feedback('password', res, setErrMsgs)
   }

   const handleSubmit = async e => {
      clear(setErrMsgs, empty)
      e.preventDefault()

      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation(
            'username',
            'Please choose a username',
            formData,
            setErrMsgs
         )
         fieldValidation(
            'email',
            'Please enter your email',
            formData,
            setErrMsgs
         )
         fieldValidation(
            'password',
            'Please choose a password',
            formData,
            setErrMsgs
         )

         return
      }

      try {
         const req = await fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })

         const res = await req.json()

         if (res.ok) {
            setFormData(empty)
            setComplete(true)
         } else
            switch (res.status) {
               case 409:
                  feedback('username', res, setErrMsgs)
                  break
               case 500:
                  allFieldsErr(res)
                  break
               case 400:
                  allFieldsErr(res)
                  break
            }
      } catch (err) {
         console.error('Error:', err)
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
                  id='new-password'
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
