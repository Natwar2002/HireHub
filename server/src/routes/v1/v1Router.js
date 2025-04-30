import { Router } from "express";
import adminRouter from "./adminRouter.js";
import authRouter from './auth.js';


const v1Router = Router();

v1Router.use('/v1', adminRouter);
v1Router.use('/v1', authRouter);

export default v1Router;
