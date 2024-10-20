import React from 'react'
import logo from '../assests/logo.jpg'
import admin from '../assests/admin.jpg'
const Navbar = () => {
  return (
    <div className='h-22 w-auto border-2 border-black '>
        <div className='flex justify-between'>
            <img src={logo} alt='home' className='h-20 rounded-lg ml-1'/>
            <p className='text-4xl font-bold flex justify-center items-center text-blue-800'>ADMIN PANEL</p>
            <img src={admin} alt='home' className='h-20 object-cover'/>
        </div>
    </div>
  )
}

export default Navbar