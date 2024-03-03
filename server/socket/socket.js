import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app=express()

const server=http.createServer(app)

const io =new Server(server,{
    cors:{
    // origin:["http://localhost:3000"],methods:["GET","POST"]
    origin:["https://bus-tracking-web-app.onrender.com"],methods:["GET","POST"]
},})

io.on('connection',(socket)=>{

    console.log("New Socket Connection ",socket.id)


    socket.on('shareLocationMur',(location)=>{

        console.log(location)
        if(location.lat != null && location.lng != null)
        {
            io.emit('getLocationMur',location)
        }
    })
   
    socket.on('shareLocationBud',(location)=>{

        console.log(location)
        if(location.lat != null && location.lng != null)
        {
            io.emit('getLocationBud',location)
        }
    })

    socket.on('disconnect',()=>{
        console.log("Connection Disconnected")
    })
})

export{app,io,server}