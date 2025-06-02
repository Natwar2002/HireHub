import crudRepository from './crudRepository.js';
import AppliedJobs from '../schema/appliedJobs.js';

const appliedJobsRepository = {
    ...crudRepository(AppliedJobs),
    getApplications: async function (page, limit, userId) {
        const jobs = await AppliedJobs.find(userId).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).populate("jobDetails");
        return jobs;
    },
    findApplication: async function ({ data }) {
        const application = await AppliedJobs.findOne(data);
        return application;
    }
}

export default appliedJobsRepository;