import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { baseUrl } from "../helper";
export const SocketContext = createContext()


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [coordinates, setCoordinates] = useState({"lat":"","lng":""})
    const [updatedCoordinates,setUpdatedCoordinates]=useState({"lat":"","lng":""})
    useEffect(() => {
        const newSocket = io('http://localhost:4000')
        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
        console.log(newSocket)
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])


    const fetchLastLocation=async(busId)=>{
        console.log(busId)
        const response = await fetch(`${baseUrl}/api/location/getlocation/${busId}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json"
            }
        })
        const data= await  response.json()
        console.log(data)
        if(!data.success)
        {
           return console.log("Error getting last location of the bus")
        }

        setUpdatedCoordinates({"lat":data.lat,"lng":data.lng})
    }
    //sharelocation
    useEffect(()=>{
        console.log(socket)
        if(socket===null)return

        socket.emit('shareLocation',{lat:coordinates.lat,lng:coordinates.lng})
// eslint-disable-next-line 
    },[coordinates])


    useEffect(()=>{
        if(socket===null)return

        socket.on('getLocation',(res)=>{
            setUpdatedCoordinates(res)
            console.log(updatedCoordinates)
        })
    })

    return (<SocketContext.Provider value={{setCoordinates ,updatedCoordinates,fetchLastLocation}}>
        {children}
    </SocketContext.Provider>)
}