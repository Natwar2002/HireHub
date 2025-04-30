import { userRepository } from "../repositories/userRepository";


export const adminInviteService = async (data)=>{
    try {
        const { email } = data;
        if(!email ){
            throw new Error("email required")
        };
        const isUserExist = await userRepository.getByEmail(email);
        if(!isUserExist){
            throw new Error("User not exist please sign up")
        };
        const response = await userRepository.update(id,{adminApproval:'requested'});
        return response
    } catch (error) {
        console.log(error);
    }
}

export const adminAuthService = async (data)=>{
    try {
        const { userId, type } = data;
        if(!type || userId ){
            throw new Error("input required")
        };
        const response = await userRepository.update(id,{adminApproval:type});
        return response
    } catch (error) {
        console.log(error);
    }
}