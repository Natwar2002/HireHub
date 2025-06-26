import { createUserDetails, deleteUserDetails, getUserDetails, updateUserDetails } from "../services/userDetailsService.js";
import { customErrorResponse } from "../utils/common/customErrorResponse.js";
import { customSuccessResponse } from "../utils/common/customSuccessResponse.js";

export const createUserDetailsController = async (req, res) => {
    try {
        if (req.file?.filename) {
            const publicId = req.file.filename;
            req.body.resume = req.file.path;
            req.body.public_key = publicId;
        }
        const response = await createUserDetails(req.user.id, req.body);
        return res.status(201).json(customSuccessResponse(response, 'User details added successfully'));
    } catch (error) {
        if (error.message) {
            return res.status(error.status || 400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

export const getUserDetailsController = async (req, res) => {
    try {
        const response = await getUserDetails(req.user.id);
        return res.status(201).json(customSuccessResponse(response, 'Successfully got user details'));
    } catch (error) {
        if (error.message) {
            return res.status(error.status || 400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

export const updateUserDetailsController = async (req, res) => {
    try {
        console.log(req.file);
        if (req.file?.filename) {
            const publicId = req.file.filename;
            req.body.resume = req.file.path;
            req.body.public_key = publicId;
        }
        const response = await updateUserDetails(req.user.id, req.body);
        return res.status(201).json(customSuccessResponse(response, 'User details updated successfully'));
    } catch (error) {
        if (error.message) {
            return res.status(error.status || 400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

export const deleteUserDetailsController = async (req, res) => {
    try {
        const response = await deleteUserDetails(req.user.id);
        return res.status(201).json(customSuccessResponse(response, 'User details deleted successfully'));
    } catch (error) {
        if (error.message) {
            return res.status(error.status || 400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}