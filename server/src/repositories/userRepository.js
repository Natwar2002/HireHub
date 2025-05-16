import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
    ...crudRepository(User),

    getUserWithDetails: async function (id) {
        const user = await User.findById(id).populate({ path: 'userDetails', populate: { path: 'projects' } });
        return user;
    },

    signUp: async function (data) {
        const newUser = new User(data);
        await newUser.save();
        return newUser;
    },

    getByEmail: async function (email) {
        const user = await User.findOne({ email });
        return user;
    },
}

export default userRepository;