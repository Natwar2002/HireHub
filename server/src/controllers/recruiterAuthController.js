import { updateUserService } from "../services/authService.js";
import { getRecruiterDetails, recruiterSignInService, recruiterSignupService } from "../services/recruiterService.js";


export const recruiterSignupController = async (req, res) => {
    try {
        const response = await recruiterSignupService(req.body);
        res.status(201).json({
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
            success: true,
            data: response
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

export const getRecruiterDetailsController = async (req, res) => {
    try {
        const response = await getRecruiterDetails(req.user._id);
        return res.status(201).json({
            success: true,
            message: 'Successfully fetched Recruiter details',
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
            error: 'Failed to get Recruiter details',
        });
    }
}

export const updateRecruiterDetailsController = async (req, res) => {
    try {
        if (req.file) {
            req.body.avatar = req.file.path;
            req.body.public_key = req.file.filename;
        }
        const response = await updateUserService(req.user._id, req.body);
        return res.status(201).json({
            success: true,
            message: 'Recruiter updated successfully',
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