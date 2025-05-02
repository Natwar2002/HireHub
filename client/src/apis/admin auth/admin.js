import axiosConfig from '../../config/axiosConfig'

export const adminSignInRequest = async ({ email, password }) => {
    try {
        const response = await axiosConfig.post('/admin/signin', { email, password});
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
};

export const adminInviteRequest= async ({ email }) => {
    try {
        const response = await axiosConfig.post('/admin/invite', { email });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}

export const adminInviteRequestUpdate = async ({ email, type }) => {
    try {
        const response = await axiosConfig.post('/admin/request', { email, type });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}