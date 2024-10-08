'use client'

import { useFormContext } from '../../../context/FormProvider'
import { useLoginContext } from '../../../context/LoginProvider'
import { useRouter } from 'next/navigation'
import { clear, fieldValidation, feedback } from '../../../helpers/formFunctions'
import { request } from '../../../helpers/request'
import TextControl from '../../../components/TextControl'
import Submit from '../../../components/Submit'

export default function Login() {
   const { emptyFormData, formData, setFormData, errorMessages, setErrorMessages } =
      useFormContext()
   const { setIsLoggedIn } = useLoginContext()
   const router = useRouter()

   const handleSubmit = async e => {
      e.preventDefault()
      clear(setErrorMessages, emptyFormData)

      if (!formData.username || !formData.password) {
         fieldValidation('username', 'Please enter your username', formData, setErrorMessages)
         fieldValidation('password', 'Please enter your password', formData, setErrorMessages)
         return
      }

      // Login the user
      request('/auth/login', 'POST', formData, false).then(({ ok, status, data }) => {
         if (ok) {
            localStorage.setItem('accessToken', data)
            // Authenticate
            request('/auth', 'POST').then(({ ok }) => {
               setIsLoggedIn(ok)
               if (document.referrer.endsWith('/register')) {
                  router.push('/')
               } else {
                  router.back()
               }
            })
         } else {
            handleErrorResponse(status, data)
         }
      })
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
      <>
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
      </>
   )
}
