import { createUserDetails, deleteUserDetails, getUserDetails, updateUserDetails } from "../services/userDetailsService.js";
import { customErrorResponse } from "../utils/common/customErrorResponse.js";
import { customSuccessResponse } from "../utils/common/customSuccessResponse.js";

export const createUserDetailsController = async (req, res) => {
    try {
        const response = await createUserDetails({ id: req.user, userDetailsData: req.body });
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
        const response = await getUserDetails(req.user);
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
        const response = await updateUserDetails(req.user, req.body);
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
        const response = await deleteUserDetails(req.user);
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