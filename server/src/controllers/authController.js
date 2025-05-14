import { signinService, signupService } from "../services/authService.js";

export const signupController = async (req, res) => {
    try {
        const response = await signupService(req.body);
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

export const signinController = async (req, res) => {
    try {
        const response = await signinService(req.body);
        return res.status(201).json({
            success: true,
            message: 'User logged in successfully',
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
            error: 'Login failed due to internal server error',
        });
    }
}