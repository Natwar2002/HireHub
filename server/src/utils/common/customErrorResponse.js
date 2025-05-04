export const customErrorResponse = (status, message, error = {}) => {
    return {
        success: false,
        status: status,
        message: message,
        error: error.message
    }
}