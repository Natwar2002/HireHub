import { useMutation } from "@tanstack/react-query";
import { createApplicationRequest } from "../../apis/applications";
import store from '../../redux/store.js'
import { addToast } from "@heroui/toast";

export const useCreateApplication = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: createApplicationMutation } = useMutation({
        mutationFn: (jobId) => createApplicationRequest(token, jobId),
        onSuccess: (data) => {
            addToast({
                title: "Applied Successfully",
                color: "primary"
            })
            console.log('Applied Successfully: ', data);
        },
        onError: (error) => {
            addToast({
                title: "Application Failed",
                description: error.message,
                color: "primary"
            })
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