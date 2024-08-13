'use client'

import { useState } from 'react'
import { Link } from 'next/link'
import { fieldValidation, feedback, clear } from '../helpers/formFunctions.js'
import TextControl from '../components/TextControl'
import Submit from '../components/Submit'

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

         if (req.ok) {
            setFormData(empty)
            setComplete(true)
         } else
            switch (req.status) {
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
         console.error(err)
         allFieldsErr('Error')
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
                  errMsg={errMsgs.username}
                  value={formData.username}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='email'
                  type='email'
                  errMsg={errMsgs.email}
                  value={formData.email}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='password'
                  type='new-password'
                  errMsg={errMsgs.password}
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
