import axiosConfig from '../../config/axiosConfig'

export const updateUserRequest = async({ token, data }) => {
    try {
        const response = axiosConfig.put('/auth/update', { data }, {
            headers : {
                'x-access-token' : token
            }
        })
        console.log("Update user request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in update user request', error);
        throw error;
    }
}

export const deleteUserRequest = async({ token }) => {
    try {
        const response = axiosConfig.delete('/auth/delete', {
            headers : {
                'x-access-token' : token
            }
        })
        console.log("Delete user request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in delete user request', error);
        throw error;
    }
}