import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar.js'

const RootLayout = () => {
  return (
    <div className='grid  grid-rows-[auto 1fr] '>
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
