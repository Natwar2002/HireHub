import crudRepository from './crudRepository.js';
import AppliedJobs from '../schema/appliedJobs.js';

const appliedJobsRepository = {
    ...crudRepository(AppliedJobs),
}

export default appliedJobsRepository;