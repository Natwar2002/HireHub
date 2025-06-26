import { useEffect } from "react";
import { useCaptureOrder } from '../../hooks/payments/useCaptureOrder';

const loadRazorpayScript = (src) => {
    return new Promise((res, rej) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            res(true);
        }
        script.onerror = () => {
            console.log('Error in loading Razorpay script');
            rej(false);
        }
        document.body.appendChild(script);
    })
}

export const RenderRazorpayPopup = ({ orderId, keyId, currency, amount }) => {

    const { captureOrderMutation } = useCaptureOrder();

    const display = async (options) => {
        const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if(!res) {
            console.log("Error in loading Razorpay script");
            return;
        }

        const rzp = new window.Razorpay(options);

        rzp.on('payment.failed', async function (response) {
            console.log("Payment Failed: ", response); 
            await captureOrderMutation({
                orderId: options.order_id,
                status: 'Failed',
                paymentId: ""
            });
        })

        rzp.open();
    }

    useEffect(() => {
        display({
            key: keyId,
            amount,
            currency,
            name: 'Natwar Patidar',
            desciption: 'Test transaction',
            order_id: orderId,
            handler: async(response) => {
                await captureOrderMutation({
                    orderId,
                    status: 'Success',
                    paymentId: response.razorpay_payment_id,
                    signature: response.razorpay_signature
                });
            },
            theme: {
                color: "#121212"
            },
        })
    }, []);

    return null;
}