'use client'

import { useFormContext } from '../../../context/FormProvider'
import { clear, fieldValidation, feedback } from '../../../helpers/formFunctions'
import { request } from '../../../helpers/request'
import TextControl from '../../../components/TextControl'
import Submit from '../../../components/Submit'
import Link from 'next/link'

export default function Register() {
   const {
      emptyFormData,
      formData,
      setFormData,
      errorMessages,
      setErrorMessages,
      complete,
      setComplete,
   } = useFormContext()

   // Handle form submission
   const handleSubmit = async e => {
      e.preventDefault()
      clear(setErrorMessages, emptyFormData)

      // Validate input fields
      if (!formData.username || !formData.email || !formData.password) {
         fieldValidation('username', 'Please choose a username', formData, setErrorMessages)
         fieldValidation('email', 'Please enter your email', formData, setErrorMessages)
         fieldValidation('password', 'Please choose a password', formData, setErrorMessages)
         return
      }

      // Register new user
      request('/auth/register', 'POST', formData, false).then(({ ok, status, data }) => {
         if (ok) {
            setComplete(true)
         } else {
            handleErrorResponse(status, data)
         }
      })
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

   // Function to handle validation errors for all fields
   const handleAllFieldsError = res => {
      feedback('username', res, setErrorMessages)
      feedback('email', res, setErrorMessages)
      feedback('password', res, setErrorMessages)
   }

   return (
      <>
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
      </>
   )
}
