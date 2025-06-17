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

export const createUserDetailsRequest = async(token, data) => {
    try {
        const response = await axiosConfig.post('/users/userDetails', data, {
            headers : {
                'x-access-token' : token,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("Create user details request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in create user details request: ', error?.response?.data?.error);
        throw error;
    }
}

export const updateUserDetailsRequest = async(token, data) => {
    try {
        const response = await axiosConfig.put('/users/userDetails', data, {
            headers : {
                'x-access-token' : token,
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log("Update user details request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in update user details request: ', error?.response?.data?.error);
        throw error;
    }
}

export const updateUserRequest = async (token, data) => {
    try {
        const response = await axiosConfig.put('/auth/update', data, {
            headers: {
                "x-access-token": token,
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Update user request", response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in update user request: ', error?.response?.data?.error);
        throw error;
    }
}