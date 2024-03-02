import BusModel from "../models/BusModel.js";

export const sharelocation=async(req,res)=>{
    const data=req.body
    const busId=req.params.id
    try {
        const existingLocation= await BusModel.findById(busId)
        if(!existingLocation)
        {
            const busData = new BusModel({
                busName: data?.busName,
                currentLocation:{
                    lat:data?.busLat,
                    lng:data?.busLng
                }
            })
            const savedData= await busData.save()
            
            return res.status(200).json({
                message:"Bus Not found so added bus",
                savedData
            })
        }
        existingLocation.currentLocation.lat=data.lat
        existingLocation.currentLocation.lng=data.lng

        const updatedData=await existingLocation.save()

        res.status(200).json({
            message:"Location Updated Successfully",
            updatedData
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

export const getLocation=async(req,res)=>{
    try {
        const busId=req.params.busId

        const businfo=await BusModel.findById(busId)
    
        if(!businfo)
        {
            return res.status(400).json({
                success:false,
                message:"Bus not found"
            })
        }
        res.status(200).json({
            success:true,
            lat:businfo.currentLocation.lat,
            lng:businfo.currentLocation.lng
        })
    } catch (error) {
        
    }
}