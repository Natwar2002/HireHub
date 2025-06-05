import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    liveLink: {
        type: String,
    },
    githubLink: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Projects = mongoose.model('Projects', projectSchema);

export default Projects;