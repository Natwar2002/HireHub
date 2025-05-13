import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    requiredSkills: {

    }
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

export default JobPost;