import { useMutation } from '@tanstack/react-query';
import { recruiterSignInRequest } from '../../apis/Recruiter auth/recruiter';


export const useRecruiterSignIn = () => {
    const { isPending, isSuccess, error, mutateAsync: adminSignIn } = useMutation({
        mutationFn: (email,password)=>recruiterSignInRequest(email,password),
        onSuccess: (data) => {
            console.log('Successfully send invite  ', data);
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