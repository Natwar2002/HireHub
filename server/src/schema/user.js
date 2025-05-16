import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'HR'],
        default: 'User',
    },
    roleUpdateRequest:{
        type:String,
        enum:['none','HR'],
        default:'pending'
    },
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserDetails',
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AppliedJobs'
        }
    ]
}, { timestamps: true });

userSchema.pre('save', async function hashPassword(next) {
    const user = this;
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;
    next();
});

const User = mongoose.model('User', userSchema);

export default User;