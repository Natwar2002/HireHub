import userRepository from "../repositories/userRepository.js";
import userDetailsRepository from '../repositories/userDetailsRepository.js';
import ClientError from "../utils/erros/clientError.js";

export const createUserDetails = async (id, userDetailsData) => {
    try {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesn't exist",
                status: 400
            });
        }
        if (user.userDetails) {
            throw new ClientError({
                message: "Invalid request",
                explanation: "User details already exist of this user",
                status: 400
            });
        }
        const userDetails = await userDetailsRepository.create(userDetailsData);
        user.userDetails = userDetails.id;
        await user.save();
        return user;
    } catch (error) {
        console.log('Error in create user details service: ', error);
        throw error
    }
}

export const getUserDetails = async (userid) => {
    try {
        const user = await userRepository.getUserWithDetails(userid);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        return user;
    } catch (error) {
        console.log('Error in get user details service: ', error);
        throw error
    }
}

export const updateUserDetails = async (id, userDetailsData) => {
    try {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        if (user.userDetails == null) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User details doesnt exist, please create it first",
                status: 400
            });
        }
        const userDetails = await userDetailsRepository.update(user.userDetails, userDetailsData);
        return user;
    } catch (error) {
        console.log('Error in update user details service: ', error);
        throw error
    }
}

export const deleteUserDetails = async (userid) => {
    try {
        const user = await userRepository.getById(userid);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        if (!user.userDetails) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "No UserDetails to delete for this user",
                status: 400
            });
        }
        await userDetailsRepository.delete(user.userDetails);
        user.userDetails = null;
        await user.save();
        return { success: true };
    } catch (error) {
        console.log('Error in delete user details service: ', error);
        throw error
    }
}