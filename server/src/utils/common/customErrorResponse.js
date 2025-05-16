export const customErrorResponse = (message, error = {}) => {
    return {
        success: false,
        message: message,
        error: error.explanation,
    }
}