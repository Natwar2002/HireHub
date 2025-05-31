import { recruiterSignInService, recruiterSignupService } from "../services/recruiterService.js";


export const recruiterSignupController = async (req, res) => {
    try {
        const response = await recruiterSignupService(req.body);
        return res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            data: response
        })
    } catch (error) {
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}


export const recruiterSignInController = async (req, res) => {
    try {
        const response = await recruiterSignInService(req.body);
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