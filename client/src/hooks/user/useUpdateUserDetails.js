import { useMutation } from "@tanstack/react-query";
import store from "../../redux/store";
import { updateUserDetailsRequest } from "../../apis/userDetails";

export const useUpdateUserDetails = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: updateUserDetailsMutation } = useMutation({
        mutationFn: (data) => updateUserDetailsRequest(token, data),
        onSuccess: (data) => {
            console.log('Successfully updated user details: ', data);
        },
        onError: (error) => {
            console.log('Failed to update user details: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateUserDetailsMutation
    };
}