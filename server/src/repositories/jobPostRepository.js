import crudRepository from './crudRepository.js';
import JobPost from '../schema/jobPost.js';

const jobPostRepository = {
    ...crudRepository(JobPost),
    getAllJobs: async function (page, limit) {
        const jobs = await JobPost.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        return jobs;
    },
    getJobsPostedByHR: async function (page, limit, userId) {
        const jobs = await JobPost.find({ postedBy: userId }).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        return jobs;
    }
}

export default jobPostRepository;