export const customSuccessResponse = (response = {}, message) => {
    return {
        success: true,
        message: message,
        data: response
    }
}