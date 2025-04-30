import { useMutation } from '@tanstack/react-query';
import { signinRequest } from '../../apis/auth';

export const useSignin = () => {
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signinRequest,
        onSuccess: (data) => {
            console.log('Successfully signed in: ', data);
        },
        onError: (error) => {
            console.log('Failed to sign in: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};