import express from 'express'
import { getLocation, sharelocation } from '../controllers/locationController.js'

const routerShareLoc=express()

routerShareLoc.post('/sharelocation/:id',sharelocation)

routerShareLoc.get('/getlocation/:busId',getLocation)

export default routerShareLoc