'use client'

import { useEffect, useState } from 'react'
import Item from '../../components/Item.jsx'

export default function Browse() {
   const [list, setList] = useState([])

   useEffect(() => {
      fetchList()
   }, [])

   const fetchList = async () => {
      try {
         const accessToken = localStorage.getItem('accessToken')

         const request = await fetch('http://localhost:4000/watchlist', {
            headers: { Authorization: `Bearer ${accessToken}` },
         })
         const response = await request.json()

         if (request.ok) {
            setList(response)
         }
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <main>
         <h1>Browse your watchlist</h1>
         {list.map(item => (
            <Item key={item.id} title={item.title} img={`https://image.tmdb.org/t/p/original/${item.poster_path}`} />
         ))}
      </main>
   )
}
