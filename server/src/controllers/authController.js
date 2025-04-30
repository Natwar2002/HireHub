import { signinService, signupService } from "../services/authService.js";

export const signupController = async (req, res) => {
    try {
        const response = await signupService(req.body);
        if(req.body.username) throw new Error("username is required")
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
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Signup failed due to internal server error',
            error:error
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
        console.log(error);

        res.status(500).json({
            success: false,
            error: 'Login failed due to internal server error',
        });
    }
}