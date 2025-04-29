import mongoose from 'mongoose';

const appliedJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Applied', 'Seen', 'Rejected', 'Accepted'],
    }
}, { timestamps: true });

const AppliedJobs = mongoose.model('AppliedJobs', appliedJobSchema);

export default AppliedJobs;