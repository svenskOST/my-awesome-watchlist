import Link from 'next/link'

export default function Home() {
   return (
      <main>
         <div>
            <h1>Home</h1>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
         </div>
      </main>
   )
}
