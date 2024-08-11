'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fieldValidation, feedback, clear } from '../helpers/formFunctions.js'
import TextControl from '../components/TextControl'
import Submit from '../components/Submit'

export default function Login() {
   const empty = {
      username: '',
      password: '',
   }

   const [formData, setFormData] = useState(empty)
   const [errMsgs, setErrMsgs] = useState(empty)
   const router = useRouter()

   const handleSubmit = async e => {
      clear(setErrMsgs, empty)
      e.preventDefault()

      if (!formData.username || !formData.password) {
         fieldValidation(
            'username',
            'Please enter your username',
            formData,
            setErrMsgs
         )
         fieldValidation(
            'password',
            'Please enter your password',
            formData,
            setErrMsgs
         )

         return
      }

      try {
         const req = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         })

         const res = await req.json()

         if (res.ok) {
            localStorage.setItem('accessToken', res.accessToken)
            localStorage.setItem('refreshToken', res.refreshToken)
            setFormData(empty)
            router.push('/')
         } else
            switch (res.status) {
               case 404:
                  feedback('username', res, setErrMsgs)
                  break
               case 401:
                  feedback('password', res, setErrMsgs)
                  break
               case 400:
                  feedback('username', res, setErrMsgs)
                  feedback('password', res, setErrMsgs)
                  break
            }
      } catch (err) {
         console.error(err)
         feedback('username', 'Error', setErrMsgs)
         feedback('password', 'Error', setErrMsgs)
      }
   }

   return (
      <main>
         <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
               <TextControl
                  id='username'
                  errMsg={errMsgs.username}
                  value={formData.username}
                  formData={formData}
                  setFormData={setFormData}
               />
               <TextControl
                  id='password'
                  errMsg={errMsgs.password}
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
