'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthProvider.jsx'
import Submit from '../../components/Submit'
import Item from '../../components/Item.jsx'

export default function Add() {
   const [selectedTitle, setSelectedTitle] = useState(null)
   const [errorMessage, setErrorMessage] = useState('')
   const [complete, setComplete] = useState(false)
   const { isLoggedIn } = useAuth()
   const router = useRouter()

   const search = async e => {
      console.log(e.target.value)
   }

   const handleSubmit = async e => {
      setErrorMessage('')
      setSelectedTitle(null)
      e.preventDefault()

      if (!selectedTitle) {
         setErrorMessage('No title selected')
         return
      }

      try {
         const request = await fetch('http://localhost:4000/watchlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedTitle),
         })

         if (request.ok) {
            setComplete(true)
         }
      } catch (error) {
         console.error(error)
         setErrorMessage('Unknown error')
      }
   }

   return (
      <main>
         <h1>Add item</h1>
         {isLoggedIn ? (
            <>
               {complete ? (
                  <>
                     <button
                        onClick={() => {
                           router.back()
                        }}
                     >
                        Return
                     </button>
                     <button onClick={setComplete(false)}>Add another</button>
                  </>
               ) : (
                  <search>
                     <form onSubmit={handleSubmit}>
                        <input type='search' placeholder='Search for a title' onChange={search} />
                        <div>
                           <label htmlFor={'selectedItem'}>{errorMessage}</label>
                           <output id='selectedItem'>
                              {selectedTitle ? (
                                 <Item
                                    title={selectedTitle.title}
                                    img={selectedTitle.poster_path}
                                 />
                              ) : (
                                 <div>empty</div>
                              )}
                           </output>
                        </div>
                        <Submit value='Add' />
                     </form>
                  </search>
               )}
            </>
         ) : (
            <h2>You are trying to access a page that requires you to be logged in.</h2>
         )}
      </main>
   )
}
