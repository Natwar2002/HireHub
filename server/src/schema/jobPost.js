import mongoose from 'mongoose';

const jobPostSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true,
    },
    jobTitle: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
        index: true,
    },
    requiredSkills: {
        type: [String],
        required: true,
        index: true,
    },
    location: {
        type: String,
        required: true,
        index: true,
    },
    experience: {
        type: String,
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
    salary: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    logo:{
        type:String
    },
     public_key:{
        type:String, // to store cloudinary key 
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance'],
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, { timestamps: true });

const JobPost = mongoose.model('JobPost', jobPostSchema);

export default JobPost;