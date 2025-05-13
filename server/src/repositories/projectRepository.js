import crudRepository from './crudRepository.js';
import Projects from '../schema/project.js'

const projectRepository = {
    ...crudRepository(Projects),
}

export default projectRepository;