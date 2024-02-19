import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import ConnectToDB from './database/db.js'
import routerBus from './routes/busRoutes.js'
import routerShareLoc from './routes/shareLocaRoutes.js'
import http from 'http'
import path from 'path'
const app=express()
const server=http.createServer(app)
dotenv.config()
const __dirname=path.resolve()

app.use(express.json())
app.use(cors())
app.use('/api/bus',routerBus)
app.use('/api/location',routerShareLoc)

app.use(express.static(path.join(__dirname,"/client/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"client","build","index.html"))
})

//Connect to Database
ConnectToDB()

const PORT=process.env.PORT||4000

server.listen(PORT,()=>{
    console.log(`Connected to Port ${PORT}`)
})
