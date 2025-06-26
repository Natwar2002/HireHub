import crudRepository from "./crudRepository.js";
import JobPost from "../schema/jobPost.js";
import AppliedJobs from "../schema/appliedJobs.js";
import { populate } from "dotenv";


const jobPostRepository = {
  ...crudRepository(JobPost),
  getAllJobs: async function (page, limit) {
    const jobs = await JobPost.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("postedBy", "username email avatar");
    return jobs;
  },
  getJobsPostedByHR: async function (page, limit, userId) {
    const jobs = await JobPost.find({ postedBy: userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("applications", "avatar email username");

    return jobs;
  },
  getDashboardData: async function (page, limit, recruiterId) {
    const jobs = await AppliedJobs.find({ recruiterId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "userId",
        select: "avatar email username userDetails",
        populate: {
          path: "userDetails",
          model: "UserDetails"
        }
      })
      .populate("jobDetails", "jobTitle");
    return jobs;
  },
};

export default jobPostRepository;
