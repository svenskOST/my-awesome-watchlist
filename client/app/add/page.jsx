'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { context } from '../../context/LoginProvider'
import { request } from '../../helpers/request'
import Item from '../../components/Item'
import Submit from '../../components/Submit'

export default function Add() {
   const { isLoggedIn } = context()
   const router = useRouter()

   // State to handle selected title, error message and completion status
   const [searchResults, setSearchResults] = useState(null)
   const [selectedTitle, setSelectedTitle] = useState(null)
   const [errorMessage, setErrorMessage] = useState('')
   const [complete, setComplete] = useState(false)

   const search = async e => {
      // Get search results with a query
      request(`/watchlist/search?${e.target.value}`).then(({ ok, status, data }) => {
         if (ok) {
            setSearchResults(data)
         } else {
            handleErrorResponse(status, data)
         }
      })
   }

   const handleSubmit = async e => {
      e.preventDefault()
      setErrorMessage('')

      if (!selectedTitle) {
         setErrorMessage('No title selected')
         return
      }

      request('/watchlist', 'POST', selectedTitle).then(res => {
         const status = res.status
         const data = res.json()

         if (res.ok) {
            setComplete(true)
         } else {
            handleErrorResponse(status, data)
         }
      })
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
