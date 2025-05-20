import { useMutation } from '@tanstack/react-query';
import store from '../../redux/store';
import { capturePaymentRequest } from '../../apis/payments';

export const useCaptureOrder = () => {
    const { token } = store.getState().auth;
    const { isError, isPending, isSuccess, mutateAsync: captureOrderMutation } = useMutation({
        mutationFn: ({orderId, paymentId, status, signature }) => capturePaymentRequest({token, orderId, signature, paymentId, status }),
        onSuccess: (data) => {
            console.log("Payment captured successfully: ", data);
        },
        onError: (error) => {
            console.log("Error in capturing the payment: ", error);
        }
    });

    return {
        isError,
        isPending,
        isSuccess,
        captureOrderMutation
    }
}