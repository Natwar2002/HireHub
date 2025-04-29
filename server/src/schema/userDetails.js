import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({

}, { timestamps: true });

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

export default UserDetails;