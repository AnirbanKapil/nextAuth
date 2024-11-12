import mongoose from "mongoose";



export async function connect () {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        
        const connection = mongoose.connection

        connection.on("connected",() => {
            console.log("MongoDB connected")
        })

        connection.on("error",(error) => {
            console.log("MongoDB connection error. Please make sure DB is up and running. Error msg :" + error)
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong while connecting to DB")
        console.log(error)
    }
}


