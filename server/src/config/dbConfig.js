import mongoose from 'mongoose';
import { DB_URL } from './serverConfig.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database');

    } catch (error) {
        console.log('Error connecting to database', error);
    }
}