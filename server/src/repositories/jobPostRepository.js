import crudRepository from './crudRepository.js';
import JobPost from '../schema/jobPost.js';

const jonPostRepository = {
    ...crudRepository(JobPost),
}

export default jonPostRepository;