import { Router } from "express";
import v1Router from "./v1/v1Router";


const appRouter = Router();

appRouter.use('/v1',v1Router);

export default appRouter;
