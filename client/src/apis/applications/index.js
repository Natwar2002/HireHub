import axiosConfig from "../../config/axiosConfig";

export const createApplicationRequest = async (token, jobId) => {
  try {
    const response = await axiosConfig.post(`/appliedJobs/${jobId}`,{}, {
      headers: {
        "x-access-token" : token,
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};


export const getApplicationsRequest = async (token) => {
  try {
    const response = await axiosConfig.get(`/appliedJobs`, {
      headers: {
        "x-access-token" : token,
      }
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};