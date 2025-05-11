import { useMutation } from "@tanstack/react-query";
import { updateUserRequest } from "../../apis/user";
import store from '../../redux/store'

export const useUpdateUser = () => {
    const { token } = store.getState().auth;
    const { isPending, isSuccess, error, mutateAsync: updateUserMutation } = useMutation({
        mutationFn: (data) => updateUserRequest({ token, data }),
        onSuccess: (data) => {
            console.log('Successfully updated user: ', data);
        },
        onError: (error) => {
            console.log('Failed to update data: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        updateUserMutation
    };
}