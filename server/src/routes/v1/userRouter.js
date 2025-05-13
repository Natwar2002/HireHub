import { Router } from "express";
import { createUserDetailsController } from "../../controllers/userDetailsController.js";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.post('/userdetails', isAuthenticated, createUserDetailsController);

export default userRouter;