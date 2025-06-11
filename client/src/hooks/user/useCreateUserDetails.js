import { useMutation } from '@tanstack/react-query';
import { createUserDetailsRequest } from '../../apis/userDetails';
import store from '../../redux/store';

export const useCreateUserDetails = () => {
    const { token } = store.getState().auth;

    const { isPending, isSuccess, error, mutateAsync: createUserDetailsMutation } = useMutation({
        mutationFn: (data) => createUserDetailsRequest(token, data),
        onSuccess: (data) => {
            console.log('Successfully added user details: ', data);
        },
        onError: (error) => {
            console.log('Failed to add user details: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        createUserDetailsMutation
    };
};