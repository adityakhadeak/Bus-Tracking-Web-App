import express from 'express'
import { getLocation, sharelocation } from '../controllers/locationController.js'

const routerShareLoc=express()

routerShareLoc.post('/sharelocation/:busName',sharelocation)

routerShareLoc.get('/getlocation/:busName',getLocation)

export default routerShareLoc