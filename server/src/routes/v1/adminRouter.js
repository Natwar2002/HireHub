import { Router } from 'express'
import { adminAuthApproveController, adminInviteController, adminSignInController } from '../../controllers/adminAuthController.js';

const adminRouter = Router();

adminRouter.post('/invite', adminInviteController);
adminRouter.post('/request', adminAuthApproveController);
adminRouter.post('/signin', adminSignInController);

export default adminRouter;