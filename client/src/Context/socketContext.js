import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext()


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const newSocket = io('http://localhost:4000')
        setSocket(newSocket)
        return () => {
            newSocket.disconnect()
        }
    }, [])
    
    return (<SocketContext.Provider>
        {children}
    </SocketContext.Provider>)
}