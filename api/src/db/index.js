import mongoose from "mongoose";
//import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MNOGODB connection error ",error);
        //node.js access process current apllication jispe chl rhi uska reference h
        process.exit(1)
    }
}

export default connectDB