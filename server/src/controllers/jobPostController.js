import { deleteImageCloudinary } from "../config/cloudinary.js";
import {
  createJobPost,
  deleteJobPost,
  getAllJobPost,
  getJobPostByHR,
  updateJobPost,
} from "../services/jobPostService.js";
import { customErrorResponse } from "../utils/common/customErrorResponse.js";
import { customSuccessResponse } from "../utils/common/customSuccessResponse.js";

export const createJobPostController = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("company logo is required");
    }
    req.body.logo = req.file.path;
    req.body.public_key = req.file.filename;
    const response = await createJobPost(req.user.id, req.body);
    return res
      .status(201)
      .json(customSuccessResponse(response, "Job post created successfully"));
  } catch (error) {
    if (error.message) {
      res
        .status(error.status || 500)
        .json(customErrorResponse(error.message, error));
    } else {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
    if (req.file || req.file.filename) {
      console.log("deleting image");
      await deleteImageCloudinary(req.file.filename);
      return;
    }
  }
};

export const updateJobPostController = async (req, res) => {
  if (req.file) {
      req.body.logo = req.file.path;
      req.body.public_key = req.file.filename;
  }
  try {
    const response = await updateJobPost(req.user, req.params.jobId, req.body);
    return res
      .status(202)
      .json(customSuccessResponse(response, "Job post updated successfully"));
  } catch (error) {
    if (error.message) {
      return res
        .status(error.status)
        .json(customErrorResponse(error.message, error));
    }
    if (req.file || req.file.filename) {
      console.log("deleting image");
      await deleteImageCloudinary(req.file.filename);
    }
    return res.status(500).json({
      success: false,
      data: {},
      error: error.message,
    });
  }
};

export const deleteJobPostController = async (req, res) => {
  try {
    const response = await deleteJobPost(req.user, req.params.jobId);
    return res
      .status(201)
      .json(customSuccessResponse(response, "Job post deleted successfully"));
  } catch (error) {
    if (error.message) {
      return res
        .status(error.status)
        .json(customErrorResponse(error.message, error));
    }
    return res.status(500).json({
      success: false,
      data: {},
      error: error.message,
    });
  }
};

export const getJobPostController = async (req, res) => {
  try {
    const response = await updateJobPost(req.user, req.params.jobId);
    return res
      .status(201)
      .json(customSuccessResponse(response, "Job post fetched successfully"));
  } catch (error) {
    if (error.message) {
      return res
        .status(error.status)
        .json(customErrorResponse(error.message, error));
    }
    return res.status(500).json({
      success: false,
      data: {},
      error: error.message,
    });
  }
};

export const getAllJobPostController = async (req, res) => {
  try {
    const response = await getAllJobPost(req.user);
    return res
      .status(201)
      .json(customSuccessResponse(response, "Job posts fetched successfully"));
  } catch (error) {
    console.log(error.message);
    if (error.message) {
      return res
        .status(error.status)
        .json(customErrorResponse(error.message, error));
    }
    return res.status(500).json({
      success: false,
      data: {},
      error: error.message,
    });
  }
};

export const getAllJobPostByHRController = async (req, res) => {
  try {
    const response = await getJobPostByHR(req.user);
    return res
      .status(201)
      .json(customSuccessResponse(response, "Job posts fetched successfully"));
  } catch (error) {
    console.log(error.message);
    if (error.message) {
      return res
        .status(error.status)
        .json(customErrorResponse(error.message, error));
    }
    return res.status(500).json({
      success: false,
      data: {},
      error: error.message,
    });
  }
};
