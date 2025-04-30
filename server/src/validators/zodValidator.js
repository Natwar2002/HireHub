export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            console.log('Zod Validation error', error.errors);
            let errorMessage = [];
            error.errors.forEach(key => {
                errorMessage.push(`${key.path[0]}: ${key.message}`)
            });
            res.status(400).json({
                message: 'Invalid data',
                explanation: errorMessage,
                success: false
            })
        }
    }
}