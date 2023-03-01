import React from 'react'
import { Outlet } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import Footer from './Footer';
import Header from './Header'

const Layout = () => {
  const { user } = UserAuth();
  return (
    <div className='relative min-h-[100vh]'>
      <div className='z-50 relative'>
        <Header />
      </div>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pb-72">
        <h1 className='text-red-800 font-bold text-xl text-center font-[mali] block xs:hidden md:block lg:hidden pt-4'>CC's Angel Fund Holiday Wishlist</h1>
        <Outlet />
      </div>
        
      <div className='absolute h-72 bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout