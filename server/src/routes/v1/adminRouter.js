import { Router } from 'express'
import { adminAuthApproveController, adminInviteController, adminSingInController } from '../../controllers/adminAuthController';

const adminRouter = Router();

adminRouter.post('/invite', adminInviteController);
adminRouter.post('/request', adminAuthApproveController);
adminRouter.post('/signin', adminSingInController);

export default adminRouter;