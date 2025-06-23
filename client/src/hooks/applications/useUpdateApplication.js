import { useMutation } from "@tanstack/react-query";
import { updateApplicationRequest } from "../../apis/applications";
import store from '../../redux/store.js'

export const useUpdateApplication = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: updateApplicationMutation } = useMutation({
        mutationFn: ({ jobId, data }) => updateApplicationRequest(token, jobId, data),
        onSuccess: (data) => {
            console.log('Successfully updated status: ', data);
        },
        onError: (error) => {
            console.log('Failed to update status: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateApplicationMutation
    };
}