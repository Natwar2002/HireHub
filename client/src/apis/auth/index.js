import axiosConfig from '../../config/axiosConfig'

export const signupRequest = async ({ email, password, username }) => {
    try {
        const response = await axiosConfig.post('/auth/users/signup', { email, password, username });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}

export const signinRequest = async ({ email, password }) => {
    try {
        const response = await axiosConfig.post('/auth/users/signin', { email, password });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};