import mongoose from "mongoose";

const busSchema=new mongoose.Schema({
    busId:{
        type: String,
        required: true,
        unique: true
    },
    route:{
        type:String,
        required:true
    },
    currentLocation:{
        'lat':String,
        'lng':String
    },    
},
{
   timestamps:true 
})

export default mongoose.model('buses','busSchema')