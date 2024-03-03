import express from 'express'
import {addBusStop, addbus, addschedule, getAllBusStops, getbusschedule} from '../controllers/busController.js'

const routerBus=express()

//adding a bus schedule
routerBus.post("/addschedule",addschedule)

//getting the bus schedule
routerBus.get("/getbusschedule",getbusschedule)

//addbusdetails
routerBus.post("/addbus",addbus)

//addbusStop
routerBus.post("/addstop",addBusStop)

//getAll busstops
routerBus.get("/getbusstops",getAllBusStops)
export default routerBus