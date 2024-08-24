'use client'

import { useState } from 'react'
import { useAuth } from '../../context/AuthProvider'
import { useRouter } from 'next/navigation'
import Item from '../../components/Item'
import Submit from '../../components/Submit'

export default function Add() {
   // State to handle selected title, error message and completion status
   const [selectedTitle, setSelectedTitle] = useState(null)
   const [errorMessage, setErrorMessage] = useState('')
   const [complete, setComplete] = useState(false)

   // Access context and router
   const { isLoggedIn } = useAuth()
   const router = useRouter()

   // Mockup search function
   const search = async e => {
      const query = e.target.value
      console.log(`Searching for: ${query}`)

      // Mockup för att simulera att ett objekt hittades
      if (query === 'Example') {
         setSelectedTitle({
            title: 'Example Movie',
            poster_path: '/path/to/example/poster.jpg',
         })
         setErrorMessage('')
      } else {
         setSelectedTitle(null)
         setErrorMessage('No results found')
      }
   }

   // Handle form submission
   const handleSubmit = async e => {
      e.preventDefault()

      // Reset error message
      setErrorMessage('')

      // Make sure user has selected a title
      if (!selectedTitle) {
         setErrorMessage('No title selected')
         return
      }

      // Attempt to add the title to watchlist
      try {
         const request = await fetch('http://localhost:4000/watchlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedTitle),
         })
         const response = await request.json()

         if (request.ok) {
            setComplete(true) // Success
         } else {
            handleErrorResponse(response.status, data)
         }
      } catch (error) {
         console.error('Failed to add to watchlist: ', error)
         setErrorMessage('Unknown error occured')
      }
   }

   // Handle specific error responses based on status codes
   const handleErrorResponse = (status, data) => {
      switch (status) {
         default:
            setErrorMessage('An unexpected error occurred')
            break
      }
   }

   // Reset form to add a new title
   const resetForm = () => {
      setSelectedTitle(null)
      setErrorMessage('')
      setComplete(false)
   }

   return (
      <main>
         <h1>Add item</h1>
         {isLoggedIn ? (
            <>
               {complete ? (
                  <>
                     <h2>Title was added to your watchlist</h2>
                     <button onClick={() => router.back()}>Return</button>
                     <button onClick={resetForm}>Add another</button>
                  </>
               ) : (
                  <form onSubmit={handleSubmit}>
                     <input type='search' placeholder='Search for a title' onChange={search} />
                     <div>
                        <label htmlFor={'selectedItem'}>{errorMessage}</label>
                        <output id='selectedItem'>
                           {selectedTitle ? (
                              <Item title={selectedTitle.title} img={selectedTitle.poster_path} />
                           ) : (
                              <div>Empty</div>
                           )}
                        </output>
                     </div>
                     <Submit value='Add' />
                  </form>
               )}
            </>
         ) : (
            <h2>You need to be logged in to interact with your watchlist</h2>
         )}
      </main>
   )
}
