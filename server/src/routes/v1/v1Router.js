<<<<<<< HEAD
import { Router } from "express";
import adminRouter from "./adminRouter";


const v1Router = Router();

v1Router.use('/v1',adminRouter);

export default v1Router;
=======
import express from "express";
import authRouter from './auth.js'

const router = express.Router();

router.use('/auth', authRouter);

export default router;
>>>>>>> 256cff7aff484524786d2002f3d9eb9fc5005ce3
