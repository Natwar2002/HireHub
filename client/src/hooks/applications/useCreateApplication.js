import { useMutation } from "@tanstack/react-query";
import { createApplicationRequest } from "../../apis/applications";
import store from '../../redux/store.js'

export const useCreateApplication = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: createApplicationMutation } = useMutation({
        mutationFn: (jobId) => createApplicationRequest(token, jobId),
        onSuccess: (data) => {
            console.log('Applied Successfully: ', data);
        },
        onError: (error) => {
            console.log('Failed to Apply: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createApplicationMutation
    };
}