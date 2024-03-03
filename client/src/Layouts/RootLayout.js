import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar.js'

const RootLayout = () => {
  return (
    <div className='grid  grid-rows-[auto 1fr] '>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
