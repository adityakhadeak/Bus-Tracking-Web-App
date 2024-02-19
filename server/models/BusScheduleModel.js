import mongoose from "mongoose";

const busScheduleSchema=new mongoose.Schema({
    busId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'buses'
        
    },
    busNo:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    busTime:{
        type:String,
        required:true
    }
})

export default mongoose.model('busschedule',busScheduleSchema)