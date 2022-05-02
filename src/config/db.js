import mongoose from 'mongoose';
import { config }  from 'dotenv';

config();
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.NODE_ENV === 'production' ? process.env.DB_CONNECTION : process.env.NODE_ENV === 'test' ? process.env.TEST_DB : process.env.MONGO_URI ,
             { useNewUrlParser: true, })
        console.log('connected to db'.blue)
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
    
}

export default connectDB;