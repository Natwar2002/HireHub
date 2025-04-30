import userRepository from "../repositories/userRepository.js";
import { createJWT } from "../utils/authUtils.js";


export const adminInviteService = async (data) => {
    try {
        const { email } = data;
        if (!email) {
            throw new Error("email required")
        };
        const isUserExist = await userRepository.getByEmail(email);
        if (!isUserExist) {
            throw new Error("User not exist please sign up")
        };
        const response = await userRepository.update(id, { adminApproval: 'requested' });
        return response
    } catch (error) {
        console.log(error);
    }
}

export const adminAuthService = async (data) => {
    try {
        const { userId, type } = data;
        if (!type || userId) {
            throw new Error("input required")
        };
        const response = await userRepository.update(id, { adminApproval: type });
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
        if (isValidUser.adminApproval !== 'approved') throw new Error('now allowed to sing in contact relevant authority');
        const response = await userRepository.update(isValidUser._id, { role: 'Admin' }, { new: true });
        return {
            token: createJWT({ email }),
            data: response
        }
    } catch (error) {
        console.log(error)
    }
}