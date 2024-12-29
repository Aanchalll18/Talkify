import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`DATABASE connected: ${conn.connection.host}`);
    } catch (e) {
        console.error("MongoDB connection error:", e);
    }
};
