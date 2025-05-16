import { Router } from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createProjectController, updateProjectController } from "../../controllers/projectController.js";

const projectRouter = Router();

projectRouter.post('/', isAuthenticated, createProjectController);
// projectRouter.get('/', isAuthenticated, getUserDetailsController);
projectRouter.put('/:id', isAuthenticated, updateProjectController);
// projectRouter.delete('/', isAuthenticated, deleteUserDetailsController);

export default projectRouter;