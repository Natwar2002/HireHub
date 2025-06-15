import { Router } from "express";
import { isAuthenticatedRecruiter } from '../../middlewares/authMiddleware.js';
import { createJobPostController, deleteJobPostController, getAllJobPostByHRController, getAllJobPostController, getJobPostController, updateJobPostController } from "../../controllers/jobPostController.js";
import { uploader } from "../../config/cloudinary.js";

const jobPostRouter = Router();


jobPostRouter.post('/post', isAuthenticatedRecruiter, uploader.single("logo"), createJobPostController);
jobPostRouter.put('/:jobId', isAuthenticatedRecruiter, uploader.single("logo"), updateJobPostController);
jobPostRouter.delete('/:jobId', isAuthenticatedRecruiter, deleteJobPostController);
jobPostRouter.get('/:jobId', isAuthenticatedRecruiter, getJobPostController);
jobPostRouter.get('/all', isAuthenticatedRecruiter, getAllJobPostController);
jobPostRouter.get('/', isAuthenticatedRecruiter, getAllJobPostByHRController);
// user id is already available in req.user object 

export default jobPostRouter;