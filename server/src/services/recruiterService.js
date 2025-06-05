import argon2 from "argon2";
import userRepository from "../repositories/userRepository.js";
import { createRecruiterJWT } from "../utils/authUtils.js";


export const recruiterSignupService = async (data) => {
  try {
    const { username, email, password } = data;
    if (!username || !email || !password) {
      throw new Error("username, email and password required");
    }
    const isUserExist = await userRepository.getByEmail(email);
    if (!isUserExist) {
      await userRepository.create(data);
      const user = await userRepository.getByEmail(email);
      if (!user) throw new Error("failed to create user in db");
      const response = await userRepository.update(user.id, {
        role: "HR",
      });
      return response;
    };
    if (isUserExist.role == "HR") {
      throw new Error("already have recruiter access please sign in")
    } else {
      const response = await userRepository.update(isUserExist.id, {
        role: "HR",
      });
      return response;
    }
  } catch (error) {
    console.log(error);
    throw error
  }
};


export const recruiterSignInService = async (data) => {
  try {
    const { email, password } = data;
    if (!email || !password) throw new Error("email and password is required");
    const isValidUser = await userRepository.getByEmail(email);
    if (!isValidUser) throw new Error("user is not exist");
    if (isValidUser.role !== "HR" && isValidUser.role !== "HR")
      throw new Error("not allowed to sing in contact relevant authority");
    const isMatched = await argon2.verify(isValidUser.password, password);
    if (!isMatched) throw new Error("wrong password");
    return {
      token: createRecruiterJWT({ email }),
      data: {
        username: isValidUser.username,
        email: isValidUser.email,
      },
    };
  } catch (error) {
    console.log(error);
    throw error
  }
};
