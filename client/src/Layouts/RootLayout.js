import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar.js'

const RootLayout = () => {
  return (
    <div className='grid  grid-rows-[auto 1fr] '>
      <div className='w-[100vw]'>
        <Navbar />
      </div>
      <div  className='w-[100vw]' >
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
