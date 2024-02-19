import BusModel from "../models/BusModel.js"
import BusScheduleModel from "../models/BusScheduleModel.js"
export const addschedule = async (req, res) => {
    const data = req.body
    try {
        const busId=await BusModel.findOne({"busName":`TO${data?.to.toUpperCase()}${data?.busTime}`})
        const scheduleData = new BusScheduleModel({
            busId:busId._id,
            busNo: data?.busNo,
            from: data?.from,
            to: data?.to,
            busTime: data?.busTime
        })

        const savedSchdule = await scheduleData.save()

        res.status(200).json({
            message: "Data Saved",
            data: savedSchdule
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

export const getbusschedule=async(req,res)=>{
    try {
        const data= await BusScheduleModel.find()

        if(!data)
        {
            res.status(400).json({
                message:"No data found"
            })
        }
        res.status(200).json({
            message:"success",
            data
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error
        })
    }
}

export const addbus = async (req, res) => {
    const data = req.body
    try {
        const busData = new BusModel({
            busName: data?.busName,
            currentLocation:{
                lat:data?.busLat,
                lng:data?.busLng
            }
        })

        const savedData= await busData.save()

        res.status(200).json({
            message: "Data Saved",
            data: savedData
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

