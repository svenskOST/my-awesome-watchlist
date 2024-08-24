'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthProvider'
import Item from '../../components/Item'

export default function Browse() {
   // State to handle watchlist and loading/error statuses
   const [list, setList] = useState([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   // Access context
   const { isLoggedIn } = useAuth()

   useEffect(() => {
      const fetchList = async () => {
         // Attempt to fetch watchlist
         try {
            const accessToken = localStorage.getItem('accessToken')
            const request = await fetch('http://localhost:4000/watchlist', {
               headers: { Authorization: `Bearer ${accessToken}` },
            })
            const response = await request.json()

            if (request.ok) {
               setList(response)
            } else {
               handleErrorResponse(response.status, data)
            }
         } catch (error) {
            console.error('Failed to fetch watchlist:', error)
            setError('Failed to load your watchlist. Please try again later.')
         } finally {
            setLoading(false)
         }
      }

      if (isLoggedIn) {
         fetchList()
      } else {
         setLoading(false)
      }
   }, [isLoggedIn])

   // Handle specific error responses based on status codes
   const handleErrorResponse = (status, data) => {
      switch (status) {
         case 401:
            setError(data)
            break
         default:
            setError('An unexpected error occurred')
      }
   }

   // Returns either a loading message, error message, or the watchlist depending on status
   return (
      <main>
         <h1>Browse your watchlist</h1>
         {loading ? (
            <h2>Loading your watchlist...</h2>
         ) : error ? (
            <h2>{error}</h2>
         ) : isLoggedIn ? (
            list.length > 0 ? (
               list.map(item => <Item key={item.id} title={item.title} img={item.poster_path} />)
            ) : (
               <h2>Your watchlist is empty.</h2>
            )
         ) : (
            <h2>You need to be logged in to view your watchlist</h2>
         )}
      </main>
   )
}
