import axiosConfig from "../../config/axiosConfig";

export const recruiterSingUpRequest = async ({ email, username, password }) => {
  try {
    const response = await axiosConfig.post("/recruiter/signup", { email, username, password });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const recruiterSignInRequest = async ({ email, password }) => {
  try {
    const response = await axiosConfig.post("/recruiter/signin", {
      email,
      password,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const updateRequiterRequest = async (token, data) => {
    try {
        const response = await axiosConfig.put('/recruiter', data, {
            headers: {
              "x-access-token": token,
              'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Update recruiter request", response);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in update recruiter request: ', error?.response?.data?.error);
        throw error;
    }
}

export const getRecruiterDetails = async (token) => {
    try {
        const response = await axiosConfig.get('/recruiter', {
            headers: {
              "x-access-token": token,
            }
        });
        console.log("Get recruiter request", response.data.data);
        return response?.data?.data;
    } catch (error) {
        console.log('Error in get recruiter request: ', error?.response?.data?.error);
        throw error;
    }
}