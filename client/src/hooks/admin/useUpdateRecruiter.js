import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { updateRequiterRequest } from "../../apis/Recruiter auth/recruiter";

export const useUpdateRecruiter = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: updateRecruiterMutation } = useMutation({
        mutationFn: (data) => updateRequiterRequest(token, data),
        onSuccess: (data) => {
            console.log('Successfully updated user');
        },
        onError: (error) => {
            console.log('Failed to update user: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateRecruiterMutation
    };
}