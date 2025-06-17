import { Router } from "express";
import { createUserDetailsController, deleteUserDetailsController, getUserDetailsController, updateUserDetailsController } from "../../controllers/userDetailsController.js";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { resumeUploader } from "../../config/cloudinary.js";

const userRouter = Router();

userRouter.post('/userdetails', isAuthenticated, resumeUploader.single("resume"), createUserDetailsController);
userRouter.get('/userdetails', isAuthenticated, getUserDetailsController);
userRouter.put('/userDetails', isAuthenticated, resumeUploader.single("resume"), updateUserDetailsController);
userRouter.delete('/userDetails', isAuthenticated, deleteUserDetailsController);

export default userRouter;