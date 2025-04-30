import { Router } from 'express'
import { adminAuthApproveController, adminInviteController } from '../../controllers/adminAuthController';

const adminRouter = Router();

adminRouter.post('/invite', adminInviteController);
adminRouter.post('/request', adminAuthApproveController);

export default adminRouter;