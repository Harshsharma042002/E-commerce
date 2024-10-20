import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='ml-5 flex items-start'>
  <div className='flex flex-col space-y-4 gap-5 mt-10'>
    <Link to='/addProduct' className='flex items-center space-x-2 gap-3 '>
      <p className='text-3xl font-bold border-2 border-black rounded-md'>AddProduct</p>
    </Link>
    <Link to='/getProduct' className='flex items-center space-x-2 gap-3'>
      <p className='text-3xl font-bold border-2 border-black rounded-md'>GetProduct</p>
    </Link>
  </div>

  <div className="h-auto w-1 bg-black ml-5 self-stretch"></div>
</div>

  )
}

export default Sidebar