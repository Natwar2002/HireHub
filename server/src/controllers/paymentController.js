import { CURRENCY, RECEIPT_SECRET } from "../config/serverConfig.js";
import razorpay from '../config/razorpayConfig.js';
import { customSuccessResponse } from '../utils/common/customSuccessResponse.js';
import { customErrorResponse } from '../utils/common/customErrorResponse.js';
import { createPaymentService, updatePaymentStatus } from '../services/paymentService.js';

export const createOrderController = async (req, res) => {
    try {
        const amount = parseInt(req.body.amount);
        const options = {
            amount: amount,
            currency: CURRENCY,
        }
        const order = await razorpay.orders.create(options);

        await createPaymentService(order.id, order.amount);

        if (!order) {
            throw new Error('Failed to create order');
        }
        return res.status(201).json(customSuccessResponse(order, "Order created successfully"));
    } catch (error) {
        console.log(error);
        if (error.message) {
            return res.status(error.status || 400).json(customErrorResponse(error.message, error))
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

export const capturePaymentController = async (req, res) => {
    const { orderId, paymentId, signature, status } = req.body;
    try {
        const response = await updatePaymentStatus(orderId, status, paymentId, signature);
        return res.status(201).json(customSuccessResponse(response, "Payment captured successfully"));
    } catch (error) {
        console.log(error);
        if (error.message) {
            return res.status(error.status || 400).json(customErrorResponse(error));
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        })
    }
}