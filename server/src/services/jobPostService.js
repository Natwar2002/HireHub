import jobPostRepository from '../repositories/jobPostRepository.js';
import userRepository from '../repositories/userRepository.js';
import ClientError from "../utils/erros/clientError.js";

export const createJobPost = async (id, jobDetailsData) => {
    try {
        const author = await userRepository.getById(id);
        if (!author) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        if (author.role !== 'HR') {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Only HR can post jobs",
                status: 400
            });
        }

        jobDetailsData.postedBy = id;
        const newJobPost = await jobPostRepository.create(jobDetailsData);
        console.log(newJobPost);
        return newJobPost;
    } catch (error) {
        console.log("Error in creat job post", error);
        throw error;
    }
}

export const updateJobPost = async (id, jobId, jobDetailsData) => {
    try {
        const author = await userRepository.getById(id);
        if (!author) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        if (author.role !== 'HR') {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Only HR can update jobs",
                status: 403
            });
        }
        const job = await jobPostRepository.getById(jobId);
        if (!job) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "JobPost with this id doesnt exist",
                status: 400
            });
        }
        if (job.postedBy._id.toString() !== id) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Only owner HR of this post can update it",
                status: 403
            });
        }

        const updatedJobPost = await jobPostRepository.update(jobId, jobDetailsData);
        return updatedJobPost;
    } catch (error) {
        console.log("Error in update job post", error);
        throw error;
    }
}

export const deleteJobPost = async (id, jobId) => {
    try {
        const author = await userRepository.getById(id);
        if (!author) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        if (author.role !== 'HR') {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Only HR can delete jobs",
                status: 400
            });
        }
        const job = await jobPostRepository.getById(jobId);
        if (!job) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "JobPost with this id doesnt exist",
                status: 400
            });
        }
        if (job.postedBy !== id) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Only owner HR of this post can update it",
                status: 403
            });
        }

        await jobPostRepository.delete(jobId, jobDetailsData);
        return { success: true };
    } catch (error) {
        console.log("Error in delete job post", error);
        throw error;
    }
}

export const getJobPost = async (jobId) => {
    try {
        const job = await jobPostRepository.getById(jobId);
        if (!job) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "JobPost with this id doesnt exist",
                status: 400
            });
        }
        return job;
    } catch (error) {
        console.log("Error in get job post", error);
        throw error;
    }
}

export const getAllJobPost = async () => {
    try {
        const page = 1;
        const limit = 20;
        const jobposts = await jobPostRepository.getAllJobs(page, limit);
        return jobposts;
    } catch (error) {
        console.log("Error in get all job post", error);
        throw error;
    }
}