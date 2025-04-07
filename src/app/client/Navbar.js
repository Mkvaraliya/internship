import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-slate-900 text-white flex justify-between items-center p-6 shadow-2xl shadow-gray-700'>
        <div>
        <h1 className='text-3xl font-bold'>E-Commerce</h1>
        </div>
        <div className='font-semibold text-xl mr-1'>
          <a className='mr-5 hover:text-gray-300' href='/'>Products</a>
          <a className='mr-5 hover:text-gray-300' href='/'>About Us</a>
          <a className='mr-5 hover:text-gray-300' href='/'>Contact Us</a>
        </div>
        <div className='flex items-center justify-s'>
          <button className='bg-red-600  hover:bg-red-400 px-4 py-1 text-xl mx-2 rounded cursor-pointer'>Cart</button>
          <button className='bg-green-600 hover:bg-green-400 px-4 py-1 text-xl mx-2 rounded cursor-pointer'>Login</button>
          <button className='bg-indigo-600 hover:bg-indigo-400 px-4 py-1 text-xl mx-2 rounded cursor-pointer'>Register</button>
        </div>

    </div>
  )
}

export default Navbar
