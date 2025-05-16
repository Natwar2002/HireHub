import { useMutation } from '@tanstack/react-query';
import { recruiterSingUpRequest } from '../../apis/Recruiter auth/recruiter';


export const useRecruiterSignUp = () => {
    const { isPending, isSuccess, error, mutateAsync: adminInviteUpdate } = useMutation({
        mutationFn: (email,type)=>recruiterSingUpRequest(email,type),
        onSuccess: (data) => {
            console.log('Successfully updated', data);
        },
        onError: (error) => {
            console.log('Failed to update: ', error);
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        adminInviteUpdate
    };
};