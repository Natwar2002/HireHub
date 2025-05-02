import { useMutation } from '@tanstack/react-query';
import { adminInviteRequest } from '../../apis/admin auth/admin';


export const useAdminInvite = () => {
    const { isPending, isSuccess, error, mutateAsync: adminInvite } = useMutation({
        mutationFn: (email)=>adminInviteRequest(email),
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