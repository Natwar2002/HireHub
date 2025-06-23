import { Router } from "express";
import { isAuthenticated, isAuthenticatedRecruiter } from '../../middlewares/authMiddleware.js';
import { getApplicationsController, createApplicationController, updateApplicationController } from "../../controllers/appliedJobsController.js";

const appliedJobsRouter = Router();

appliedJobsRouter.get('/', isAuthenticated, getApplicationsController);
appliedJobsRouter.post('/:jobId', isAuthenticated, createApplicationController);
appliedJobsRouter.put('/:jobId', isAuthenticatedRecruiter, updateApplicationController);

export default appliedJobsRouter;