import React, { useContext, useEffect, useState } from 'react'
import { fetchAllContext } from '../Context/fetchAllContext'
import { baseUrl } from '../helper'
import { SocketContext } from '../Context/socketContext.js'
import { Link } from 'react-router-dom'
const TimeTable = () => {
  const { setCoordinatesMur, setCoordinatesBud, fetchLastLocation} = useContext(SocketContext)
  const { fetchBusSchedule } = useContext(fetchAllContext)
  const [destination, setDestination] = useState('murbad')

  // const [fromBadlapurSchedule, setFromBadlapurSchedule] = useState([])
  // const [fromMurbadSchedule, setFromMurbadSchedule] = useState([])
  const [watchPosId, setWatchPosId] = useState(null)
  const [isSharingLocation, setIsSharingLocation] = useState({ "busName": "", "isOn": false });

  const shareLocation = (busName) => {
    setIsSharingLocation({ busName, isOn: true });
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        if (busName === "TOMURBAD")
          setCoordinatesMur({ lat: latitude, lng: longitude })
        else
          setCoordinatesBud({ lat: latitude, lng: longitude })

        const response = await fetch(`${baseUrl}/api/location/sharelocation/${busName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "lat": latitude, "lng": longitude })
        })
        if (!response) {
          return console.log("Some error occur during sharing location")
        }
        // const data = await response.json()
        // alert(`your Location is lng:${data.updatedData.currentLocation.lng}  lat:${data.updatedData.currentLocation.lat}`)
        // console.log(data, "updated Location")

      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
    setWatchPosId(watchId)
  }

  const stopShareLocation = (busName) => {
    navigator.geolocation.clearWatch(watchPosId);
    setIsSharingLocation({ busName: busName, isOn: false });
  }
  useEffect(() => {
    fetchBusSchedule()
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   if (busSchedule) {
  //     let badlapurSchedule = busSchedule?.filter((schedule) => schedule.from === "badlapur")
  //     setFromBadlapurSchedule(badlapurSchedule)
  //     let murbadSchedule = busSchedule?.filter((schedule) => schedule.from === "murbad")
  //     setFromMurbadSchedule(murbadSchedule)
  //   }
  // }, [busSchedule])


  return (
    <div className='p-10'>
      <div className='flex flex-col justify-center items-center my-7'>
        <h1>Choose Destination</h1>
        <div className='p-2 flex flex-row justify-between w-[20%]'>
          <div>
            <input disabled={isSharingLocation.isOn} onChange={(e) => {
              setDestination(e.target.value)
            }} id='des1' type="radio" name='des' checked={destination === 'badlapur'} value='badlapur' />
            <label htmlFor="badlapur"> Badlapur</label>
          </div>
          <div>
            <input disabled={isSharingLocation.isOn} onChange={(e) => {
              setDestination(e.target.value)
            }} id='des2' type="radio" name='des' checked={destination === 'murbad'} value='murbad' />
            <label htmlFor="murbad"> Murbad</label>
          </div>
        </div>
      </div>

      <div className='px-[20px flex flex-col justify-center items-center py-5 my-5'>
        <h1 className='my-3 p-3 text-center text-lg'>{destination === 'murbad' ? 'From Badlapur' : 'From Murbad'}</h1>


        {destination === 'murbad' ?
          <div className='flex flex-row justify-between w-[20%]'>
            <button onClick={() => fetchLastLocation("TOMURBAD")} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white' ><Link to={'/livelocation'} >View Locn</Link></button>
            {isSharingLocation.busName === "TOMURBAD" && isSharingLocation.isOn === true ?
              <button onClick={() => stopShareLocation("TOMURBAD")} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white'>Stop Share</button>
              : <button disabled={isSharingLocation.isOn} onClick={() => shareLocation("TOMURBAD")} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white '>Share Loc</button>
            }
          </div> :
          <div className='flex flex-row justify-between w-[20%]'>
            <button onClick={() => fetchLastLocation("TOBADLAPUR")} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white' ><Link to={'/livelocation'} >View Locn</Link></button>
            {isSharingLocation.busName === "TOBADLAPUR" && isSharingLocation.isOn === true ?
              <button onClick={() => stopShareLocation("TOBADLAPUR")} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white'>Stop Share</button>
              : <button disabled={isSharingLocation.isOn} onClick={() => shareLocation("TOBADLAPUR")} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white '>Share Loc</button>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default TimeTable
