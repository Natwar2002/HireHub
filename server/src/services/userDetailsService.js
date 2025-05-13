import userRepository from "../repositories/userRepository.js";
import userDetailsRepository from '../repositories/userDetailsRepository.js';

export const createUserDetails = async ({ id, userDetailsData }) => {
    try {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explantion: "User with this id doesnt exist",
                status: 400
            });
        }
        // console.log('User details : ', user.userDetails);
        const userDetails = await userDetailsRepository.create(userDetailsData);
        user.userDetails = userDetails;
        await user.save();
        return user;
    } catch (error) {
        console.log('Error in create user details service: ', error);
        throw error
    }
}