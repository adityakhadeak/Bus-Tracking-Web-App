import mongoose from "mongoose";

const busSchema=new mongoose.Schema({
    busName:{
        type: String,
        required: true,
        unique: true
    },
    currentLocation:{
        lat:String,
        lng:String
    },    
},
{
   timestamps:true 
})

export default mongoose.model('buses',busSchema)