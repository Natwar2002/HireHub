import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({
    highestEducation: {
        qualification: {
            type: String,
            enum: ["BTech", "MTech", "BCA", "MCA", "BCom", "MCom", "Other"],
            required: true
        },
        completionDate: {
            type: Date,
            required: true
        }
    },
    experience: [
        {
            title: String,
            company: String,
            designation: String,
        }
    ],
    skills: {
        type: [String],
        required: true,
        index: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    phoneNo: {
        type: String,
        required: true,
        match: /^[0-9]{10,15}$/
    },
    location: {
        state: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        }
    },
    linkedinLink: {
        type: String,
        required: true,
        match: /^https:\/\/(www\.)?linkedin\.com\/.+$/i
    },
    gitHubLink: {
        type: String,
        required: true,
        match: /^https:\/\/(www\.)?github\.com\/.+$/i
    },
    portfolioLink: {
        type: String,
    },
    resume: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

export default UserDetails;