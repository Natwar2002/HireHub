export const customSuccessResponse = (status, message, response = {}) => {
    return {
        success: true,
        status: status,
        message: message,
        data: response
    }
}