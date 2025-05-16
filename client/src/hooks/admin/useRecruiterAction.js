import { useMutation } from '@tanstack/react-query';
import { recruiterActionRequest } from '../../apis/Recruiter auth/recruiter';


export const useRecruiterAction = () => {
    const { isPending, isSuccess, error, mutateAsync: adminInvite } = useMutation({
        mutationFn: (email)=>recruiterActionRequest(email),
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
        adminInvite
    };
};