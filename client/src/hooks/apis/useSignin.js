import { useMutation } from '@tanstack/react-query';
import { signinRequest } from '../../apis/auth';
import store from '../../redux/store';
import { setAuth } from '../../redux/actions/authAction';

export const useSignin = () => {
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signinRequest,
        onSuccess: (data) => {
            console.log('Successfully signed in: ', data);
            const userObject = JSON.stringify(data)
            
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', data.token);
            
            store.dispatch(setAuth(data, data.token));
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