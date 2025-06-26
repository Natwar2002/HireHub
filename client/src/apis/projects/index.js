import axiosConfig from '../../config/axiosConfig'

export const createProjectRequest = async(token, data) => {
    try {
        const response = await axiosConfig.post('/projects', data, {
            headers : {
                'x-access-token' : token
            }
        })
        return response?.data?.data;
    } catch (error) {
        console.log('Error in create project request: ', error);
        throw error;
    }
}

export const updateProjectRequest = async(token, data, id) => {
    try {
        const response = await axiosConfig.put(`/projects/${id}`, data, {
            headers : {
                'x-access-token' : token
            }
        })
        return response?.data?.data;
    } catch (error) {
        console.log('Error in update project request: ', error);
        throw error;
    }
}

export const deleteProjectRequest = async(token, id) => {
    try {
        const response = await axiosConfig.delete(`/projects/${id}`, {
            headers : {
                'x-access-token' : token
            }
        })
        return response?.data?.data;
    } catch (error) {
        console.log('Error in delete project request: ', error?.response?.data?.error);
        throw error;
    }
}