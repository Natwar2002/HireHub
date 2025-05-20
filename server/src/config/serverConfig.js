import dotenv from 'dotenv';

dotenv.config();

export const DB_URL = process.env.DB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY || '10d';
export const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
export const JWT_HR_SECRET = process.env.JWT_HR_SECRET;
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
export const CURRENCY = process.env.CURRENCY;
export const RECEIPT_SECRET = process.env.RECEIPT_SECRET || 'receipt_1103';