import { createUserDetails } from "../services/userDetailsService.js";
import { customErrorResponse } from "../utils/common/customErrorResponse.js";
import { customSuccessResponse } from "../utils/common/customSuccessResponse.js";

export const createUserDetailsController = async (req, res) => {
    try {
        console.log("Inside controller");
        console.log(req.user);
        console.log(req.body);
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