import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { jobDeleteRequest } from "../../apis/post job/jobPost";

export const useDeleteJob = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: deleteJobMutation } = useMutation({
        mutationFn: (jobData) => jobDeleteRequest( jobData, token),
        onSuccess: (data) => {
            console.log('Post deleted Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to delete post: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        deleteJobMutation
    };
}