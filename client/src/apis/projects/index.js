import axiosConfig from '../../config/axiosConfig'

export const createProjectRequest = async(token, data) => {
    try {
        const response = await axiosConfig.post('/projects', data, {
            headers : {
                'x-access-token' : token
            }
        })
        console.log("Create project request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in create project request: ', error?.response?.data?.error);
        throw error;
    }
}

export const updateProjectRequest = async(token, data, id) => {
    try {
        const response = await axiosConfig.post(`/projects/${id}`, data, {
            headers : {
                'x-access-token' : token
            }
        })
        console.log("Update project request",response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in update project request: ', error?.response?.data?.error);
        throw error;
    }
}