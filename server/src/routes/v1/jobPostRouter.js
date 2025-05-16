import { Router } from "express";
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { createJobPostController, deleteJobPostController, getAllJobPostController, getJobPostController, updateJobPostController } from "../../controllers/jobPostController.js";

const jobPostRouter = Router();

jobPostRouter.post('/', isAuthenticated, createJobPostController);
jobPostRouter.put('/:jobId', isAuthenticated, updateJobPostController);
jobPostRouter.delete('/:jobId', isAuthenticated, deleteJobPostController);
jobPostRouter.get('/:jobId', isAuthenticated, getJobPostController);
jobPostRouter.get('/', isAuthenticated, getAllJobPostController);

export default jobPostRouter;