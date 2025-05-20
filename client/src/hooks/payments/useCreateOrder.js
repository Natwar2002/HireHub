import store from '../../redux/store.js';
import { useMutation } from '@tanstack/react-query';
import { createOrderRequest } from '../../apis/payments/index.js';

export const useCreateOrder = () => {
    const { token } = store.getState().auth;
    const { isError, error, isSuccess, isPending, mutateAsync: createOrderMutation} = useMutation({
        mutationFn: (amount) => createOrderRequest({token, amount}),
        onSuccess: (data) => {
            console.log("Order created successfully: ", data);
        },
        onError: (error) => {
            console.log("Order created successfully: ", error);
        }
    });

    return {
        isError,
        isSuccess,
        error,
        isPending,
        createOrderMutation
    }
}