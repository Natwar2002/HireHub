import appliedJobsRepository from "../repositories/appliedJobs.js";
import userRepository from '../repositories/userRepository.js';
import jobPostRepository from '../repositories/jobPostRepository.js';
import ClientError from "../utils/erros/clientError.js";

export const getApplicationService = async (userId) => {
    try {
        const page = 1;
        const limit = 20;
        const applications = await appliedJobsRepository.getApplications(page, limit, userId);
        return applications;
    } catch (error) {
        console.log("Error in get applications service: ", error);
        throw error;
    }
}

export const createApplicationService = async (userId, jobId) => {
    try {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User not found",
                status: 404
            });
        }
        const job = await jobPostRepository.getById(jobId);
        if (!job) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Job not found",
                status: 404
            });
        }
        const existingApplication = await appliedJobsRepository.findApplication({ userId: userId, jobDetails: jobId });
        if (existingApplication) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: 'You have already applied to this job',
                status: 400
            });
        }
        const application = await appliedJobsRepository.create({ userId, status: 'Applied', jobDetails: jobId, recruiterId: job.postedBy });

        job.applications.push(userId);
        await job.save();

        user.applications.push(application);
        await user.save();

        return application;
    } catch (error) {
        console.log("Error in get applications service: ", error);
        throw error;
    }
}

export const updateApplicationService = async (recruiterId, jobdata, applicationId) => {
    try {
        const application = await appliedJobsRepository.getById(applicationId);
        if (!application) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Application not found",
                status: 404
            });
        }
        const job = await jobPostRepository.getById(application.jobDetails);
        if (!job) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Job not found",
                status: 404
            });
        }

        if (job.postedBy.toString() != recruiterId._id) {
            throw new ClientError({
                message: "Unauthorized to edit this",
                explanation: "Only recruiter who posted the job can change status",
                status: 403
            });
        }

        const newApplication = await appliedJobsRepository.update(applicationId, jobdata);
        return newApplication;
    } catch (error) {
        console.log("Error in update application status service: ", error);
        throw error;
    }
}