import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../helper.js";

export const fetchAllContext = createContext()

export const FetchAllContextProvider = (props) => {

    const [busSchedule, setBusSchedule] = useState(null)
    const [busStops, setBusStops] = useState(null)


    useEffect(() => {
        fetchBusStops()

    }, [])
    
    

    const fetchBusSchedule = async () => {
        const response = await fetch(`${baseUrl}/api/bus/getbusschedule`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",            }
        })

        const data=await response.json()

        if(!response.ok)
        {
            console.log('Error getting Schedule')
        }

        console.log(data)
        setBusSchedule(data.data)
    }

    const fetchBusStops = async () => {
        const response = await fetch(`${baseUrl}/api/bus/getbusstops`,{
            method:"GET",
            headers:{
                "Content-Type": "application/json",            }
        })

        const data=await response.json()

        if(!response.ok)
        {
            console.log('Error getting Schedule')
        }

        console.log(data)
        setBusStops(data.data)
    }

    return (<fetchAllContext.Provider value={{fetchBusSchedule,fetchBusStops,busSchedule,busStops}} >
        {props.children}
    </fetchAllContext.Provider>)
}

