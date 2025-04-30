<<<<<<< HEAD
import { Router } from "express";
import v1Router from "./v1/v1Router";


const appRouter = Router();

appRouter.use('/api',v1Router);

export default appRouter;
=======
import express from "express";
import v1Router from './v1/v1Router.js'

const router = express.Router();

router.use('/v1', v1Router);

export default router;
>>>>>>> 256cff7aff484524786d2002f3d9eb9fc5005ce3
