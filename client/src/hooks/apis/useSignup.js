import { useMutation } from '@tanstack/react-query';
import { signupRequest } from '../../apis/auth';

export const useSignup = () => {
    const { isPending, isSuccess, error, mutateAsync: signupMutation } = useMutation({
        mutationFn: signupRequest,
        onSuccess: (data) => {
            console.log('Successfully signed up: ', data);
        },
        onError: (error) => {
            console.log('Failed to sign up: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signupMutation
    };
};