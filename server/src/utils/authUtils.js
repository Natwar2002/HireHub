import jwt from 'jsonwebtoken';
import { JWT_ADMIN_SECRET, JWT_EXPIRY, JWT_SECRET } from '../config/serverConfig.js'

export const createJWT = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY })
} 
export const createAdminJWT = (payload) => {
    return jwt.sign(payload, JWT_ADMIN_SECRET, { expiresIn: JWT_EXPIRY })
} 