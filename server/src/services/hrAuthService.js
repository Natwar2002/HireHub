import userRepository from "../repositories/userRepository.js";
import ClientError from "../utils/erros/clientError.js"

export const hrInviteService = async (email) => {
    try {
        if (!email) {
            throw new ClientError({
                message: "Email not found",
                explanation: "Invalid data sent from the client"
            });
        };
        const isUserExist = await userRepository.getByEmail(email);
        if (!isUserExist) {
            throw new ClientError({
                message: "User with this email does not exist",
                explanation: "Invalid data sent from the client"
            });
        }

    } catch (error) {

    }
}