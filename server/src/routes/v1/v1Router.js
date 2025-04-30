import { Router } from "express";
import adminRouter from "./adminRouter";


const v1Router = Router();

v1Router.use('/admin',adminRouter);
v1Router.use('/auth', authRouter);

export default v1Router;
