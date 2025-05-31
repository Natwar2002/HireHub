import jwt from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_RECRUITER_SECRET, JWT_SECRET } from '../config/serverConfig.js'

export const createJWT = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })
} 

export const createRecruiterJWT = (payload) => {
    return jwt.sign(payload, JWT_RECRUITER_SECRET, { expiresIn: JWT_EXPIRY })
} 