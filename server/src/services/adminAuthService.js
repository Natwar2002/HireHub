import argon2 from "argon2";
import userRepository from "../repositories/userRepository.js";
import { createAdminJWT } from "../utils/authUtils.js";


export const adminInviteService = async (email) => {
    try {
        if (!email) {
            throw new Error("email required")
        };
        const isUserExist = await userRepository.getByEmail(email);
        if (!isUserExist) {
            throw new Error("User not exist please sign up")
        };
        console.log(isUserExist.id)
        const response = await userRepository.update(isUserExist.id, { adminApproval: 'requested' });
        return response
    } catch (error) {
        console.log(error);
    }
}

export const adminAuthService = async (data) => {
    try {
        const { id, type } = data;
        if (!type || !id) {
            throw new Error("input required")
        };
        const response = await userRepository.update(id, { adminApproval: type });
        const isApproved = response.adminApproval;
        if (isApproved === 'approved') {
            await userRepository.update(id, { role: "Admin" })
        }
        return response
    } catch (error) {
        console.log(error);
    }
};

export const adminSignInService = async (data) => {
    try {
        const { email, password } = data
        if (!email || !password) throw new Error("email and password is required");
        const isValidUser = await userRepository.getByEmail(email);
        if (!isValidUser) throw new Error('user is not exist');
        if (isValidUser.adminApproval !== 'approved' && isValidUser.role !== "Admin") throw new Error('Not allowed to sign in contact relevant authority');
        const isMatched = await argon2.verify(password, isValidUser.password);
        if (isMatched) throw new Error("wrong password")
        return {
            token: createAdminJWT({ email }),
            data: response
        }
    } catch (error) {
        console.log(error)
    }
}