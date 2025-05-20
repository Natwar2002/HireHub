import { Router } from "express";
import { capturePaymentController, createOrderController } from "../../controllers/paymentController.js";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const paymentRouter = Router();

paymentRouter.post('/order', isAuthenticated, createOrderController);
paymentRouter.post('/capture', isAuthenticated, capturePaymentController);

export default paymentRouter;