import mongoose from 'mongoose'

const busStopSchema=new mongoose.Schema({
    stopName:{
        type:String,
        required:true
    },
    location:{
        lat:String,
        lng:String
    }
})

export default mongoose.model('busstops',busStopSchema)