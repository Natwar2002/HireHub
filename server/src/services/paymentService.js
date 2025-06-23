import ClientError from '../utils/erros/clientError.js';
import paymentRepository from '../repositories/paymentRepository.js';
import crypto from 'crypto';
import { RAZORPAY_KEY_SECRET } from '../config/serverConfig.js';

export const createPaymentService = async (orderId, amount) => {
    try {
        if (!orderId || !amount) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "No data provided by the client"
            });
        }
        amount /= 100;
        const payment = await paymentRepository.create({ orderId, amount });
        return payment;
    } catch (error) {
        console.log('Error creating the payment: ', error);
        throw error;
    }
}

export const updatePaymentStatus = async (orderId, status, paymentId, signature) => {
    try {
        if (status === 'Success') {
            const shaResponse = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
            if (shaResponse === signature) {
                const payment = await paymentRepository.updateOrder(orderId, { status, paymentId });
                return payment;
            } else {
                throw new Error('Payment varification failed');
            }
        }
    } catch (error) {
        console.log('Error in capturing payment', error);
    }
}