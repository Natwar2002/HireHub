import express from "express";
import { signinController, signupController, updateUserController } from "../../controllers/authController.js";
import { signinSchema, signupSchema } from "../../validators/authSchema.js";
import { validate } from "../../validators/zodValidator.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { uploader } from "../../config/cloudinary.js";

const router = express.Router();

router.post('/users/signup', validate(signupSchema), signupController);
router.post('/users/signin', validate(signinSchema), signinController);
router.put('/update', isAuthenticated, uploader.single("avatar"), updateUserController);

export default router;