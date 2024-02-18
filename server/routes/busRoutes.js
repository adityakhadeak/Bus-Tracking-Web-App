import express from 'express'
import {addschedule, getbusschedule} from '../controllers/busController.js'

const routerBus=express()

//adding a bus schedule
routerBus.post("/addschedule",addschedule)

//getting the bus schedule
routerBus.get("/getbusschedule",getbusschedule)

export default routerBus