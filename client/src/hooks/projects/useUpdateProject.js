import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { updateProjectRequest } from "../../apis/projects";

export const useUpdateProject = (id) => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: updateProjectMutation } = useMutation({
        mutationFn: (data) => updateProjectRequest(token, data, id),
        onSuccess: (data) => {
            console.log('Project updated Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to update project: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateProjectMutation
    };
}