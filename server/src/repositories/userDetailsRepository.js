import UserDetails from '../schema/userDetails.js'
import crudRepository from './crudRepository.js';

const userDetailsRepository = {
    ...crudRepository(UserDetails),
}

export default userDetailsRepository;