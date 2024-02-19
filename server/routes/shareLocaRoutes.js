import express from 'express'
import { sharelocation } from '../controllers/locationController.js'

const routerShareLoc=express()

routerShareLoc.post('/sharelocation/:id',sharelocation)

export default routerShareLoc