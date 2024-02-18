import BusScheduleModel from "../models/BusScheduleModel.js"
export const addschedule = async (req, res) => {
    const data = req.body
    console.log(req.body)
    try {
        const scheduleData = new BusScheduleModel({
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