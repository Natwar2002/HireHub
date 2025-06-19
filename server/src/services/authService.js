import userRepository from "../repositories/userRepository.js";
import argon2 from "argon2";
import { createJWT } from '../utils/authUtils.js';
import ClientError from "../utils/erros/clientError.js";

export const signupService = async (data) => {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const duplicatedField = Object.keys(error.keyValue)[0];
            console.log(`A user with same ${duplicatedField} already exists`);
            throw {
                message: `A user with same ${duplicatedField} already exists`,
                status: 400,
            }
        }
        console.log("Error in sign up service", error);
        throw error;
    }
};

export const signinService = async (data) => {
    try {
        const user = await userRepository.getByEmail(data.email);
        if (!user) {
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "No registered user found with this email",
                status: 400
            });
        }
        const isMatch = await argon2.verify(user.password, data.password);
        if (!isMatch) {
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "Invalid password, please try again",
                status: 400
            });
        }
        return {
            username: user.username,
            email: user.email,
            id: user._id,
            role: user.role,
            token: createJWT({ id: user._id, email: user.email })
        }
    } catch (error) {
        console.log('Error in signin service', error);
        throw error;
    }
}

export const updateUserService = async (userId, userData) => {
    try {
        if (!userData) {
            throw new ClientError({
                explanation: "Data not found",
                message: "No user data provided",
                status: 400
            });
        }
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ClientError({
                explanation: "Invalid data sent from the client",
                message: "User not found",
                status: 400
            });
        }
        const newUser = await userRepository.update(userId, userData);
        return newUser;
    } catch (error) {
        console.log('Error in update user service', error);
        throw error;
    }
}