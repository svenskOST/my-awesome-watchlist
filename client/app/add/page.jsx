'useClient'

import { useState } from 'react'

export default function Add() {
   const [item, setItem] = useState()

   const handleClick = () => {
      if (item) {
         //send post request
      }
   }

   return (
      <main>
         <div>
            <button onClick={handleClick}>+</button>
         </div>
      </main>
   )
}
