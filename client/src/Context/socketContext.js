import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { baseUrl } from "../helper";
export const SocketContext = createContext()


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [coordinatesMur, setCoordinatesMur] = useState({ "lat": "", "lng": "" })
    const [coordinatesBud, setCoordinatesBud] = useState({ "lat": "", "lng": "" })
    const [updatedCoordinatesMur, setUpdatedCoordinatesMur] = useState({ "lat": "19.168799", "lng": "73.236864" })
    const [updatedCoordinatesBud, setUpdatedCoordinatesBud] = useState({ "lat": "19.258226", "lng": "73.389935" })
    useEffect(() => {
        const newSocket = io(baseUrl)
        newSocket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });
        console.log(newSocket)
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])


    const fetchLastLocation = async (busName) => {
        console.log(busName)
        const response = await fetch(`${baseUrl}/api/location/getlocation/${busName}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        console.log(data)
        if (!data.success) {
            return console.log("Error getting last location of the bus")
        }
        if (busName === "TOMURBAD")
            setUpdatedCoordinatesMur({ "lat": data.lat, "lng": data.lng })
        else
            setUpdatedCoordinatesBud({ "lat": data.lat, "lng": data.lng })

    }
    //sharelocationMurbad
    useEffect(() => {
        console.log(socket)
        if (socket === null) return

        socket.emit('shareLocationMur', { lat: coordinatesMur.lat, lng: coordinatesMur.lng })
        // eslint-disable-next-line 
    }, [coordinatesMur])

    //sharelocationBadlapur
    useEffect(() => {
        if (socket === null) return

        socket.emit('shareLocationBud', { lat: coordinatesBud.lat, lng: coordinatesBud.lng })
        // eslint-disable-next-line 
    }, [coordinatesBud])

    // getLocation Murbad 
    useEffect(() => {
        if (socket === null) return

        socket.on('getLocationMur', (res) => {
            setUpdatedCoordinatesMur(res)
            console.log(updatedCoordinatesMur)
        })
    })

    // getLocation Badlapur 
    useEffect(() => {
        if (socket === null) return

        socket.on('getLocationBud', (res) => {
            setUpdatedCoordinatesBud(res)
            console.log(updatedCoordinatesBud)
        })
    })

    return (<SocketContext.Provider value={{ setCoordinatesMur, updatedCoordinatesMur, setCoordinatesBud, updatedCoordinatesBud, fetchLastLocation }}>
        {children}
    </SocketContext.Provider>)
}