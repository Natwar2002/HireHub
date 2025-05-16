import axiosConfig from "../../config/axiosConfig";

export const jobPostRequest = async ({ email, password }) => {
  try {
    const response = await axiosConfig.post("/job/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const jobUpdateRequest = async ({ email }) => {
  try {
    const response = await axiosConfig.post("/recruiter/signin", { email });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const jobDeleteRequest = async ({ email, type }) => {
  try {
    const response = await axiosConfig.post("/recruiter/signup", {
      email,
      type,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const recruiterUpdateRequestUpdate = async ({ token, data }) => {
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
