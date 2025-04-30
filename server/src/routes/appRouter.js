import { Router } from "express";
import v1Router from "./v1/v1Router.js";


const appRouter = Router();

appRouter.use('/v1', v1Router);

export default appRouter;
