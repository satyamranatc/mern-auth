import mongoose from "mongoose";
import "dotenv/config"


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected....")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb