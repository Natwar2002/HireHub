import { useMutation } from '@tanstack/react-query';
import {  adminInviteRequestUpdate } from '../../apis/admin auth/admin';


export const useAdminRequest = () => {
    const { isPending, isSuccess, error, mutateAsync: adminInviteUpdate } = useMutation({
        mutationFn: (email,type)=>adminInviteRequestUpdate(email,type),
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