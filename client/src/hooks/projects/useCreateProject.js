import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { createProjectRequest } from "../../apis/projects";

export const useCreateProject = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: createProjectMutation } = useMutation({
        mutationFn: (data) => createProjectRequest(data, token),
        onSuccess: (data) => {
            console.log('Post Created Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to create post: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createProjectMutation
    };
}