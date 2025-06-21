import crudRepository from "./crudRepository.js";
import JobPost from "../schema/jobPost.js";
import AppliedJobs from "../schema/appliedJobs.js";


const jobPostRepository = {
  ...crudRepository(JobPost),
  getAllJobs: async function (page, limit) {
    const jobs = await JobPost.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
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
      .populate("userId", "avatar email username")
      .populate("jobDetails", "jobTitle");

    return jobs;
  },
};

export default jobPostRepository;
