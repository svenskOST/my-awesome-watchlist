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
               <button className='raisedButton'>Raised Button</button>
               <button className='loweredButton'>Lowered Button</button>
            </div>
            <div className='flex justify-center mt-5'>
               <button className='hybridButton'>
                  <span>Cool Button</span>
               </button>
            </div>
         </div>
      </>
   )
}
