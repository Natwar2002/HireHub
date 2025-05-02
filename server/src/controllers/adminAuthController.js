import { adminAuthService, adminInviteService, adminSignInService } from "../services/adminAuthService.js"

export const adminInviteController = async (req, res) => {
    try {
        const { email } = req.body
        const response = await adminInviteService(email);
        res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

export const adminAuthApproveController = async (req, res) => {
    try {
        const data = req.body
        const response = await adminAuthService(data);
        res.status(200).json({
            success: true,
            data: response
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
};

export const adminSingInController = async (req, res) => {
    try {
        const response = await adminSignInService(req.body);
        res.status(200).json({
            success:true,
            data:response
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}