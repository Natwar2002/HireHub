import userRepository from '../repositories/userRepository.js';
import jwt from 'jsonwebtoken';
import { JWT_RECRUITER_SECRET, JWT_SECRET } from '../config/serverConfig.js';

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(400).json({
                explanation: "Invalid data sent from the client",
                message: 'No auth token provided by client.'
            });
        }

        const response = jwt.verify(token, JWT_SECRET);

        if (!response) {
            return res.status(400).json({
                explanation: "Invalid data sent from the client",
                message: "Invalid auth token provided."
            });
        }

        const user = await userRepository.getById(response.id);

        if (!user) {
            return res.status(400).json({
                explanation: "Invalid data sent from the client",
                message: "The user no longer exists."
            });
        }
        req.user = user.id;
        next();
    } catch (error) {
        console.log('Auth middleware error', error);
        return res.status(403).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
};
export const isAuthenticatedRecruiter = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(400).json({
                explanation: "Invalid data sent from the client",
                message: 'No auth token provided by client.'
            });
        }

        const response = jwt.verify(token, JWT_RECRUITER_SECRET);

        if (!response) {
            return res.status(400).json({
                explanation: "Invalid data sent from the client",
                message: "Invalid auth token provided."
            });
        }

        const user = await userRepository.getById(response.id);
        if (!user) {
            return res.status(400).json({
                explanation: "Invalid data sent from the client",
                message: "The user no longer exists."
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('Auth middleware error', error);
        return res.status(403).json({
            success: false,
            error: error,
            message: "Internal Server Error"
        })
    }
}; 