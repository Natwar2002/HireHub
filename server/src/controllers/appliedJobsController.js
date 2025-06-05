import { getApplicationService, createApplicationService } from "../services/appliedJobService.js";
import { customErrorResponse } from "../utils/common/customErrorResponse.js";
import { customSuccessResponse } from '../utils/common/customSuccessResponse.js';

export const getApplicationsController = async (req, res) => {
    try {
        const response = await getApplicationService(req.user);
        return res.status(201).json(customSuccessResponse(response, 'Applications fetched successfully'));
    } catch (error) {
        if (error.message) {
            return res.status(error.status || 500).json(customErrorResponse(error.message, error))
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}

export const createApplicationController = async (req, res) => {
    try {
        const response = await createApplicationService(req.user, req.params.jobId);
        return res.status(201).json(customSuccessResponse(response, 'Applied successfully'));
    } catch (error) {
        if (error.message) {
            return res.status(error.status || 500).json(customErrorResponse(error.message, error))
        }
        return res.status(500).json({
            success: false,
            data: {},
            error: error.message
        });
    }
}