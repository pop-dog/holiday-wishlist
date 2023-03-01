import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed w-full h-full left-0 top-0 bg-red-900 py-8 px-8 z-50'>
      <div className="flex justify-center">
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-center'>
            <span className='rounded-full border-4 animate-spin drop-shadow-md border-transparent border-l-white border-r-white border-t-white w-8 h-8 opacity-90'></span>
          </div>
          <span className='text-yellow-200 font-[mali] italic text-2xl'>Loading</span>
        </div>

      </div>
    </div>
  )
}

export default Spinner