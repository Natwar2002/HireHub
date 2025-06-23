import express from "express";
import { getRecruiterDetailsController, recruiterSignInController, recruiterSignupController, updateRecruiterDetailsController, } from "../../controllers/recruiterAuthController.js";
import { validate } from "../../validators/zodValidator.js";
import { signinSchema, signupSchema } from "../../validators/authSchema.js";
import { isAuthenticatedRecruiter } from "../../middlewares/authMiddleware.js";
import { uploader } from "../../config/cloudinary.js";

const recruiterRouter = express.Router();

recruiterRouter.post('/signup', validate(signupSchema), recruiterSignupController);
recruiterRouter.post('/signin', validate(signinSchema), recruiterSignInController);
recruiterRouter.get('/', isAuthenticatedRecruiter, getRecruiterDetailsController);
recruiterRouter.put('/', isAuthenticatedRecruiter, uploader.single("avatar"), updateRecruiterDetailsController);

export default recruiterRouter;