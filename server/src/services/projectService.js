import userRepository from '../repositories/userRepository.js';
import projectRepository from '../repositories/projectRepository.js';
import userDetailsRepository from '../repositories/userDetailsRepository.js';
import ClientError from '../utils/erros/clientError.js';

export const createProjectService = async (id, data) => {
    try {
        const user = await userRepository.getById(id);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }
        const userDetails = await userDetailsRepository.getById(user.userDetails);
        if (!userDetails) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User details doesnt exist, please create it first",
                status: 400
            });
        }
        const project = await projectRepository.create(data);
        project.userId = id;
        userDetails.projects.push(project);
        await userDetails.save();
        return project;
    } catch (error) {
        console.log("Error in create project service", error);
        throw error;
    }
}

export const updateProjectService = async (id, projectId, data) => {
    try {
        const user = await userRepository.getUserWithDetails(id);
        if (!user) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "User with this id doesnt exist",
                status: 400
            });
        }

        const project = await projectRepository.getById(projectId)
        if (!project) {
            throw new ClientError({
                message: "Invalid data sent from the client",
                explanation: "Project with this id doesnt exist",
                status: 400
            });
        }

        if (project.userId !== id) {
            throw new ClientError({
                message: "Unauthorized",
                explanation: "You do not have permission to update this project",
                status: 403
            });
        }

        const updatedProject = await projectRepository.update(projectId, data);
        return updatedProject;
    } catch (error) {
        console.log("Error in update projects service", error);
        throw error;
    }
}