import React, { useContext, useEffect, useState } from 'react'
import { fetchAllContext } from '../Context/fetchAllContext'
import { baseUrl } from '../helper'
const TimeTable = () => {
  const { fetchBusSchedule, busSchedule } = useContext(fetchAllContext)
  const [destination, setDestination] = useState('murbad')
  const [fromBadlapurSchedule, setFromBadlapurSchedule] = useState([])
  const [fromMurbadSchedule, setFromMurbadSchedule] = useState([])
  const [watchPosId, setWatchPosId] = useState(null)
  const [isSharingLocation, setIsSharingLocation] = useState({"busId":"","isOn":false});
  const [coordinates, setCoordinates] = useState({"lat":"","lng":""})

  const shareLocation = (busId) => {
    setIsSharingLocation({busId,isOn:true});
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setCoordinates({lat:latitude,lng:longitude})
        const response = await fetch(`${baseUrl}/api/location/sharelocation/${busId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "lat": latitude, "lng": longitude })
        })
        if (!response) {
          return console.log("Some error occur during sharing location")
        }
        const data = await response.json()
        console.log(data)
        // alert(`your Location is lng:${data.updatedData.currentLocation.lng}  lat:${data.updatedData.currentLocation.lat}`)
        // console.log(data, "updated Location")

      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
    setWatchPosId(watchId)
    // return () => {
    //   navigator.geolocation.clearWatch(watchId);
    //   // setIsSharingLocation(false);
    // };
  }

  const stopShareLocation=()=>{
    navigator.geolocation.clearWatch(watchPosId);
    setIsSharingLocation({busId:"",isOn:false});
  }
  useEffect(() => {
    fetchBusSchedule()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (busSchedule) {
      let badlapurSchedule = busSchedule?.filter((schedule) => schedule.from === "badlapur")
      setFromBadlapurSchedule(badlapurSchedule)
      let murbadSchedule = busSchedule?.filter((schedule) => schedule.from === "murbad")
      setFromMurbadSchedule(murbadSchedule)
    }
  }, [busSchedule])


  return (
    <div className='p-10'>
      <div className='flex flex-col justify-center items-center my-7'>
        <h1>Choose Destination</h1>
        <div className='p-2 flex flex-row justify-between w-[30%]'>
          <div>
            <input onChange={(e) => {
              setDestination(e.target.value)
            }} id='des1' type="radio" name='des' checked={destination === 'badlapur'} value='badlapur' />
            <label htmlFor="badlapur"> Badlapur</label>
          </div>
          <div>
            <input onChange={(e) => {
              setDestination(e.target.value)
            }} id='des2' type="radio" name='des' checked={destination === 'murbad'} value='murbad' />
            <label htmlFor="murbad"> Murbad</label>
          </div>
        </div>
      </div>


      <div>
        <h1 className='my-3 p-3 text-center text-lg'>{destination === 'murbad' ? 'From Badlapur' : 'From Murbad'}</h1>
        <div className='flex justify-center items-center'>
          <table className=" text-center h-80 w-[50%] p-3 border-collapse border border-slate-400 ">
            <thead>
              <tr className='h-[50px]'>
                <th>Bus No</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            {destination === 'murbad' ?
              <tbody>
                {
                  fromBadlapurSchedule?.map((schedule, index) => (
                    <tr key={index}>
                      <td className="border-collapse border border-slate-400">{`Bus ${schedule.busNo}`}</td>
                      <td className="border-collapse border border-slate-400">{schedule.busTime}</td>
                      <td className="border-collapse border border-slate-400">
                        <div className='flex flex-row justify-around'>
                          <button className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white' >View Loc</button>
                          {isSharingLocation.busId===schedule.busId && isSharingLocation.isOn===true?
                          <button onClick={() => stopShareLocation(schedule.busId)} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white'>Stop Share</button>
                          :<button disabled={isSharingLocation.isOn}  onClick={() => shareLocation(schedule.busId)} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white '>Share Loc</button>
                          }
                        </div>
                      </td>
                    </tr>
                  ))

                }
              </tbody> :
              <tbody>
                {
                  fromMurbadSchedule?.map((schedule, index) => (
                    <tr key={index}>
                      <td className="border-collapse border border-slate-400">{`Bus ${schedule.busNo}`}</td>
                      <td className="border-collapse border border-slate-400">{schedule.busTime}</td>
                      <td className="border-collapse border border-slate-400">
                        <div className='flex flex-row justify-around'>
                          <button className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white' >View Loc</button>
                          <button onClick={() => shareLocation(schedule.busId)} className='bg-[#333333] hover:bg-[#505050] duration-100 font-bold p-[6px] w-[110px] rounded-[15px] text-white'>Share Loc</button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            }
          </table>
        </div>
      </div>
    </div>
  )
}

export default TimeTable
