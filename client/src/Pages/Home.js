import React from 'react'
import homebus from "../Images/homebus.png"
import mobileView from "../Images/mobileView.png"
import feature_pic from "../Images/features_pic.png"
import { Link } from 'react-router-dom'
const Home = () => {
  const features = [
    {
      "title": "Mobile GPS",
      "description": "Capture's location of the bus, speed, and other vehicle data."
    },
    {
      "title": "Real-time data",
      "description": "Access real-time vehicle data via our API, including bus locations, arrival predictions, and performance metrics."
    },
    {
      "title": "Live tracking",
      "description": "Display live bus locations and arrival predictions on your website or mobile app using our web-based tracking interface."
    }
  ]
  return (
    <div className='font-[Raleway] p-5 px-9 mx-8'>
      <div className='relative flex md:flex-row flex-col justify-center items-center'>
        <img className='md:w-[65%] md:block hidden w-[100%]' alt='' src={homebus} />
        <img className='w-[100%] md:hidden' alt='' src={mobileView} />

        <div className='flex w-[100%]  md:absolute relative  flex-col justify items-center md:top-[50px]'>
          <div className=' w-[80%] flex flex-col justify-center items-center text-white '>
            <h1 className='md:w-[50%] w-[100%] p-2 md:text-white text-black  md:leading-[60px] leading-[40px] text-center md:text-[48px] text-[28px] font-bold'>Real-time location tracking for your public transit system</h1>
            <h3 className='p-3 md:block hidden'>Get insights into your service, improve efficiency, and keep passengers informed with BusTrack</h3>
          </div>
          <Link to={'/timetable'} className='bg-[#333333] text-center hover:bg-[#505050] duration-100 font-bold p-[6px] my-3 md:w-[10%] w-[100px] rounded-[15px] text-white'>Start Tracking</Link>

        </div>
      </div>
      <div className='flex flex-col p-3 my-3 justify-center items-center'>
        <h1 className='text-[40px] text-center  font-bold my-4'>Why track your fleet with BusTrack?</h1>
        <div className=' flex flex-row gap-4 my-4 justify-center  flex-wrap items-center'>
          {
            features.map((feature, index) => (
              <div className='flex w-[250px] h-[220px] flex-col p-3 border-2 rounded-[10px] border-[#d4dfea] border-solid '>
                <img className='w-[30px] my-1' src={feature_pic} alt="logo" />
                <h2 className='font-bold my-1'>{feature.title}</h2>
                <p className='my-1'>{feature.description}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className='flex justify-center items-center flex-col'>
        <p className='md:w-[50%] w-[100%] p-2  text-black  md:leading-[60px] leading-[40px] text-center md:text-[48px] text-[28px] font-bold'>Ready to take control of your public transit system?</p>
        <Link to={'/timetable'} className='bg-[#333333] text-center hover:bg-[#505050] duration-100 font-bold p-[6px] my-3 md:w-[10%] w-[100px] rounded-[15px] text-white'>Start Tracking </Link>

      </div>
    </div>
  )
}

export default Home
