'use client'

import { useLoginContext } from '../../context/LoginProvider'
import { useState, useEffect } from 'react'
import { request } from '../../helpers/request'
import Item from '../../components/Item'

export default function Browse() {
   const { isLoggedIn } = useLoginContext()

   // State to handle watchlist and loading/error statuses
   const [list, setList] = useState([])
   const [loading, setLoading] = useState(true)
   const [errorMessage, setErrorMessage] = useState(null)

   useEffect(() => {
      if (isLoggedIn !== null) {
         if (isLoggedIn) {
            // Get watchlist
            request('/watchlist')
               .then(({ ok, status, data }) => {
                  if (ok) {
                     setList(data)
                  } else {
                     handleErrorResponse(status, data)
                  }
               })
               .finally(setLoading(false))
         } else {
            setLoading(false)
            setErrorMessage('You need to be logged in to view your watchlist')
         }
      }
   }, [isLoggedIn])

   // Handle specific error responses based on status codes
   const handleErrorResponse = (status, data) => {
      switch (status) {
         case 401:
            setErrorMessage(data)
            break
         default:
            setErrorMessage('An unexpected error occurred')
      }
   }

   // Returns either a loading message, error message, or the watchlist depending on status
   return (
      <>
         <h1>Browse your watchlist</h1>
         {loading ? (
            <h2>Loading your watchlist...</h2>
         ) : errorMessage ? (
            <h2>{errorMessage}</h2>
         ) : list.length > 0 ? (
            list.map(item => <Item key={item.id} title={item.title} img={item.poster_path} />)
         ) : (
            <h2>Your watchlist is empty.</h2>
         )}
      </>
   )
}
