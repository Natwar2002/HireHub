import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { createProjectRequest } from "../../apis/projects";

export const useCreateProject = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: createProjectMutation } = useMutation({
        mutationFn: (data) => createProjectRequest(token, data),
        onSuccess: (data) => {
            console.log('Project added Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to add project: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createProjectMutation
    };
}