export default function Home() {
   return (
      <>
         <h1>Home</h1>
         <div>
            <div className='w-1 bg-primary-500 h-6 m-4'></div>
            <div className='w-2 bg-primary-500 h-6 m-4'></div>
            <div className='w-3 bg-primary-500 h-6 m-4'></div>
            <div className='w-4 bg-primary-500 h-6 m-4'></div>
            <div className='w-5 bg-primary-500 h-6 m-4'></div>
            <div className='w-6 bg-primary-500 h-6 m-4'></div>
            <div className='w-7 bg-primary-500 h-6 m-4'></div>
            <div className='w-8 bg-primary-500 h-6 m-4'></div>
            <div className='w-9 bg-primary-500 h-6 m-4'></div>
            <div className='w-10 bg-primary-500 h-6 m-4'></div>
            <div className='w-11 bg-primary-500 h-6 m-4'></div>
            <div className='w-12 bg-primary-500 h-6 m-4'></div>
            <div className='w-13 bg-primary-500 h-6 m-4'></div>
            <div className='w-14 bg-primary-500 h-6 m-4'></div>
            <div className='w-15 bg-primary-500 h-6 m-4'></div>
            <div className='w-16 bg-primary-500 h-6 m-4'></div>
         </div>
         <div className='px-8 py-4 rounded-3xl w-fit h-fit absolute left-1/2 top-1/2 flex flex-col bg-primary-400'>
            <div className='flex'>
               <button className='bg-primary-400 mx-4 text-200 text-neutral-100 w-10 h-8 raised-1 hover:raised-4 rounded-2xl hover:scale-110 duration-200 shadow-primary-300'>
                  Raised Button
               </button>
               <button className='bg-primary-400 mx-4 text-200 text-neutral-100 w-10 h-8 lowered-1 hover:lowered-4 rounded-2xl hover:scale-90 duration-200 shadow-primary-300'>
                  Lowered Button
               </button>
            </div>
            <div className='flex justify-center mt-5'>
               <button className='bg-primary-400 text-200 flex justify-center items-center text-neutral-100 w-fit h-fit py-1 px-2 raised-3 hover:translate-y-1 hover:raised-5 rounded-2xl hover:scale-110 duration-200 shadow-primary-300'>
                  <div className='flex justify-center items-center bg-primary-400 text-200 text-neutral-100 w-10 h-8 lowered-1 rounded-2xl shadow-primary-300 active:lowered-4 active:scale-90 duration-100'>
                     Cool Button
                  </div>
               </button>
            </div>
         </div>
      </>
   )
}
