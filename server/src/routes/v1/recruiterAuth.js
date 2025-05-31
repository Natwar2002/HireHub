import express from "express";
import { recruiterSignInController, recruiterSignupController } from "../../controllers/recruiterAuthController.js";
import { validate } from "../../validators/zodValidator.js";
import { signinSchema, signupSchema } from "../../validators/authSchema.js";

const recruiterRouter = express.Router();

recruiterRouter.post('/signup', validate(signupSchema), recruiterSignupController);
recruiterRouter.post('/signin', validate(signinSchema), recruiterSignInController);

export default recruiterRouter;