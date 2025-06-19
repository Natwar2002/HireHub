import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({
    highestEducation: {
        qualification: {
            type: String,
            enum: ["BTech", "MTech", "BCA", "MCA", "BCom", "MCom", "Other"],
        },
        completionYear: {
            type: String,
        }
    },
    experience: [
        {
            title: String,
            company: String,
        }
    ],
    skills: {
        type: [String],
        index: true
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Projects'
        }
    ],
    phoneNo: {
        type: String,
        match: /^[0-9]{10,15}$/
    },
    location: {
        state: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        }
    },
    linkedinLink: {
        type: String,
        match: /^https:\/\/(www\.)?linkedin\.com\/.+$/i
    },
    gitHubLink: {
        type: String,
        match: /^https:\/\/(www\.)?github\.com\/.+$/i
    },
    portfolioLink: {
        type: String,
    },
    resume: {
        type: String
    }
}, { timestamps: true });

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

export default UserDetails;