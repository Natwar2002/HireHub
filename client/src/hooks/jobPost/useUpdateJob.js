import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { jobUpdateRequest } from "../../apis/post job/jobPost";

export const useUpdateJob = (jobId) => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: updateJobMutation } = useMutation({
        mutationFn: (jobData) => jobUpdateRequest(jobId, jobData, token),
        onSuccess: (data) => {
            console.log('Post updated Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to update post: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateJobMutation
    };
}