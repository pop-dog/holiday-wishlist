import React from 'react'
import venmoImage from '../images/cc_wishlist_venmo.png';

const Footer = () => {
  return (
    <div className='bg-slate-900 p-4 flex flex-col'>
        <div className='flex flex-row justify-center'>
            <div className='flex flex-row max-w-7xl'>
                <img className={'h-64 mr-4'} src={venmoImage} />
                <span className='font-[mali] text-white'>In lieu of a physical gift we're also accepting monetary donations. Please donate utilizing the QR code attached.</span>
            </div>
        </div>


    </div>
  )
}

export default Footer