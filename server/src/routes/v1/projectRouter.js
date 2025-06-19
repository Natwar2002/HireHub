import { Router } from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createProjectController, updateProjectController, deleteProjectController } from "../../controllers/projectController.js";

const projectRouter = Router();

projectRouter.post('/', isAuthenticated, createProjectController);
projectRouter.put('/:id', isAuthenticated, updateProjectController);
projectRouter.delete('/:id', isAuthenticated, deleteProjectController);

export default projectRouter;