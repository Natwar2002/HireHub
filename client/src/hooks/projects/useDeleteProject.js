import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { deleteProjectRequest } from "../../apis/projects";


export const useDeleteProject = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: deleteProjectMutation } = useMutation({
        mutationFn: (id) => deleteProjectRequest(token, id),
        onSuccess: (data) => {
            console.log('Project deleted Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to delete project: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        deleteProjectMutation
    };
}