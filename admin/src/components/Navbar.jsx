import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  const navigate = useNavigate()

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <div className='relative flex justify-center py-4'>
      <img 
        className='w-48 cursor-pointer' 
        src={assets.logo} 
        alt="Logo" 
        onClick={handleLogoClick}
      />
      <button 
        onClick={() => setToken('')} 
        className='absolute right-4 top-1/2 -translate-y-1/2 bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
