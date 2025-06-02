import { Router } from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { getApplicationsController, createApplicationController } from "../../controllers/appliedJobsController.js";

const appliedJobsRouter = Router();

appliedJobsRouter.get('/', isAuthenticated, getApplicationsController);
appliedJobsRouter.post('/:jobId', isAuthenticated, createApplicationController)

export default appliedJobsRouter;