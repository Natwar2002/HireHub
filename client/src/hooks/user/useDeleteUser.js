import { useMutation } from "@tanstack/react-query";
import store from '../../redux/store'
import { deleteUserRequest } from "../../apis/user";

export const useDeleteUser = () => {
    const { token } = store.getState().auth;
    const { isPending, isSuccess, error, mutateAsync: deleteUserMutation } = useMutation({
        mutationFn: () => deleteUserRequest({ token }),
        onSuccess: (data) => {
            console.log('Successfully deleted user: ', data);
        },
        onError: (error) => {
            console.log('Failed to delete user: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        deleteUserMutation
    };
}