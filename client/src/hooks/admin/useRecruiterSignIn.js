import { useMutation } from '@tanstack/react-query';
import { recruiterSignInRequest } from '../../apis/Recruiter auth/recruiter';
import store from '../../redux/store';
import { setAuth } from '../../redux/actions/authAction';

export const useRecruiterSignIn = () => {
    const { isPending, isSuccess, error, mutateAsync: adminSignIn } = useMutation({
        mutationFn: (email,password)=>recruiterSignInRequest(email,password),
        onSuccess: (data) => {
            const userObject = JSON.stringify(data)
            
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', data.token);
            
            store.dispatch(setAuth(data, data.token));
        },
        onError: (error) => {
            console.log('Failed to send invite: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        adminSignIn
    };
};