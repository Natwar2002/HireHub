import { Router } from "express";
import { createUserDetailsController, deleteUserDetailsController, getUserDetailsController, updateUserDetailsController } from "../../controllers/userDetailsController.js";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.post('/userdetails', isAuthenticated, createUserDetailsController);
userRouter.get('/userdetails', isAuthenticated, getUserDetailsController);
userRouter.put('/userDetails', isAuthenticated, updateUserDetailsController);
userRouter.delete('/userDetails', isAuthenticated, deleteUserDetailsController);

export default userRouter;