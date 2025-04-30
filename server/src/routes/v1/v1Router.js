import { Router } from "express";
import adminRouter from "./adminRouter.js";
import authRouter from './auth.js';


const v1Router = Router();

v1Router.use('/admin', adminRouter);
v1Router.use('/auth', authRouter);

export default v1Router;
