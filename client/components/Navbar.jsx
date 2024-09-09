import { useLoginContext } from '../context/LoginProvider'
import { useState, useEffect } from 'react'
import { request } from '../helpers/request'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
   const { isLoggedIn, setIsLoggedIn } = useLoginContext()
   const [username, setUsername] = useState('')

   useEffect(() => {
      // Authenticate
      request('/auth', 'POST').then(({ ok }) => {
         setIsLoggedIn(ok)
      })
   }, [])

   useEffect(() => {
      if (isLoggedIn) {
         // Get username
         request('/auth').then(({ ok, data }) => {
            if (ok) setUsername(data)
         })
      }
   }, [isLoggedIn])

   const handleLogout = () => {
      localStorage.removeItem('accessToken')
      setIsLoggedIn(false)
   }

   return (
      <nav className='flex justify-around w-full text-neutral-100 h-8 bg-primary-500'>
         <div className='flex items-center h-full bg-black w-fit'>
            <Image src={'/logo.png'} width={512} height={512} className='w-auto h-full'></Image>
            <h1 className='text-3xl font-bold'>MY AWESOME WATCHLIST</h1>
         </div>
         <div className='w-10 h-full bg-red-500'></div>
      </nav>
   )
}

/*         {isLoggedIn ? (
            <>
               {username}
               <Link href={'/watchlist'}>Browse</Link>
               <Link href={'/watchlist/add'}>Add</Link>
               <button onClick={handleLogout}>Logout</button>
            </>
         ) : (
            <>
               <Link href={'/user/login'}>Login</Link>
               <Link href={'/user/register'}>Register</Link>
            </>
         )}*/
