import BusModel from "../models/BusModel.js";

export const sharelocation=async(req,res)=>{
    const data=req.body
    console.log(data)
    const busId=req.params.id
    console.log(busId)
    try {
        const existingLocation= await BusModel.findById(busId)
        console.log(existingLocation)
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