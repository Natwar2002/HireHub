import { createProjectService, updateProjectService, deleteProjectService } from "../services/projectService.js";
import { customSuccessResponse } from '../utils/common/customSuccessResponse.js';
import { customErrorResponse } from '../utils/common/customErrorResponse.js';

export const createProjectController = async (req, res) => {
    try {
        const response = await createProjectService(req.user.id, req.body);
        return res.status(201).json(customSuccessResponse(response, "Project added successfully"));
    } catch (error) {
        console.log(error);

        if (error.message) {
            return res.status(400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const updateProjectController = async (req, res) => {
    try {
        const response = await updateProjectService(req.user.id, req.params.id, req.body);
        return res.status(201).json(customSuccessResponse(response, "Project updated successfully"));
    } catch (error) {
        if (error.message) {
            return res.status(400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}

export const deleteProjectController = async (req, res) => {
    try {
        const response = await deleteProjectService(req.user.id, req.params.id);
        return res.status(201).json(customSuccessResponse(response, "Project deleted successfully"));
    } catch (error) {
        if (error.message) {
            return res.status(400).json(customErrorResponse(error.message, error));
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
}