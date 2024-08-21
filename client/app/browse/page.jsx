'use client'

import { useState } from 'react'
import Item from '../../components/Item.jsx'

export default function Browse() {
   const [list, setList] = useState([])

   const fetchList = async () => {
      try {
         const request = await fetch('http://localhost:4000/watchlist/get')
         const response = await request.json()

         if (request.ok) setList(response)
      } catch (error) {
         console.error(error)
      }
   }

   const fetchData = async () => {
      try {
         //interagera med TMDB API utefter list
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <main>
         <h1>Browse your watchlist</h1>
         {list.map(item => (
            <Item title={item.title} img={item.img} />
         ))}
      </main>
   )
}

//skicka get till min server för att hämta användarens lista från min databas
//denna lista består endast av namnen
//använd sedan namnen för att hämta data från TMDB API
