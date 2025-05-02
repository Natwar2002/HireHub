import { useMutation } from '@tanstack/react-query';
import {  adminSignInRequest } from '../../apis/admin auth/admin';


export const useAdminSignIn = () => {
    const { isPending, isSuccess, error, mutateAsync: adminSignIn } = useMutation({
        mutationFn: (email,password)=>adminSignInRequest(email,password),
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