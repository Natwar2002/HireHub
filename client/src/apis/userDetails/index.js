import axiosConfig from '../../config/axiosConfig'

export const getUserDetailsRequest = async(token) => {
    try {
        const response = await axiosConfig.get('/users/userDetails', {
            headers : {
                'x-access-token' : token
            }
        })
        console.log("Get user details request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in get user details request: ', error?.response?.data?.error);
        throw error;
    }
}