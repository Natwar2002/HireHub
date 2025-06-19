import { deleteImageCloudinary } from "../config/cloudinary.js";
import { signinService, signupService, updateUserService } from "../services/authService.js";

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

export const updateUserController = async (req, res) => {
    try {
        if (req.file) {
            req.body.avatar = req.file.path;
            req.body.public_key = req.file.filename;
        }
        const response = await updateUserService(req.user, req.body);
        return res.status(201).json({
            success: true,
            message: 'User updated successfully',
            data: response
        })
    } catch (error) {
        if (req.file || req.file.filename) {
            console.log("deleting image");
            await deleteImageCloudinary(req.file.filename);
            return;
        }
        if (error.status) {
            return res.status(error.status).json({
                success: false,
                error: error.message,
            });
        }
        return res.status(500).json({
            success: false,
            error: 'Failed to update user',
        });
    }
}