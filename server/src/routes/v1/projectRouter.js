import { Router } from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createProjectController } from "../../controllers/projectController.js";

const projectRouter = Router();

projectRouter.post('/', isAuthenticated, createProjectController);
// userRouter.get('/', isAuthenticated, getUserDetailsController);
// userRouter.put('/', isAuthenticated, updateUserDetailsController);
// userRouter.delete('/', isAuthenticated, deleteUserDetailsController);

export default projectRouter;