import axiosConfig from "../../config/axiosConfig";

export const jobPostRequest = async ({jobData, token}) => {
  try {
    const response = await axiosConfig.post("/jobs/", {
      jobData
    }, {
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

export const jobUpdateRequest = async ({ jobId, jobData, token }) => {
  try {
    const response = await axiosConfig.put(`/jobs/${jobId}`, { jobData }, {
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

export const jobDeleteRequest = async ({ jobId, token }) => {
  try {
    const response = await axiosConfig.delete(`/jobs/${jobId}`, {
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

export const getAllJobPostRequest = async () => {
  try {
    const response = await axiosConfig.get(`/jobs`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const getJobPostRequest = async ({ jobId, token }) => {
  try {
    const response = await axiosConfig.get(`/jobs/${jobId}`, {
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