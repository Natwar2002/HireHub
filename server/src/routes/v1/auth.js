import express from "express";
import { signinController, signupController } from "../../controllers/authController.js";
import { signinSchema, signupSchema } from "../../validators/authSchema.js";
import { validate } from "../../validators/zodValidator.js";

const router = express.Router();

router.post('/users/signup', validate(signupSchema), signupController);
router.post('/users/signin', validate(signinSchema), signinController);

export default router;