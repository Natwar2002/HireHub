import { useMutation } from "@tanstack/react-query";
import { createJobPostRequest } from "../../apis/post job/jobPost";
import store from "../../redux/store";

export const useCreateJob = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: createJobMutation } = useMutation({
        mutationFn: (jobData) => createJobPostRequest( jobData, token),
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
        createJobMutation
    };
}