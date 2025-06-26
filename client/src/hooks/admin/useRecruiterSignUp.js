import { useMutation } from '@tanstack/react-query';
import { recruiterSingUpRequest } from '../../apis/Recruiter auth/recruiter';
import store from '../../redux/store';
import { setAuth } from '../../redux/actions/authAction';

export const useRecruiterSignUp = () => {
    const { isPending, isSuccess, error, mutateAsync: adminSignUp } = useMutation({
        mutationFn: (email,username,password)=>recruiterSingUpRequest(email,username,password),
        onSuccess: (data) => {
            const userObject = JSON.stringify(data)
            
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', data.token);
            
            store.dispatch(setAuth(data, data.token));
        },
        onError: (error) => {
            console.log('Failed to update: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        adminSignUp
    };
};