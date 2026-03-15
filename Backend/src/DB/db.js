import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
export default connectToDB;