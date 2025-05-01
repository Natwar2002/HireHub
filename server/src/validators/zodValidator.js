export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            console.log('Zod Validation error', error.errors);
            let errorMessage = ''
            let explanation = [];
            error.errors.forEach(key => {
                explanation.push(key.path[0] + ' ' + key.message);
                errorMessage += ': ' + key.path[0] + ' ' + key.message;
            });
            res.status(400).json({
                message: 'Validation error' + errorMessage,
                explanation: explanation,
                success: false
            })
        }
    }
}