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

export const recruiterUpdateRequest = async ({ token, data }) => {
  try {
    const response = axiosConfig.post(
      "/recruiter/update",
      { data },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("Update user request", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error in update user request", error);
    throw error;
  }
};

export const recruiterActionRequest = async ({ token, data }) => {
  try {
    const response = axiosConfig.post(
      "/recruiter/update",
      { data },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("Update user request", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error in update user request", error);
    throw error;
  }
};
