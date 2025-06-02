import { useCreateOrder } from '../../hooks/payments/useCreateOrder';
import { Check, LucideLoader } from "lucide-react";
import { RenderRazorpayPopup } from '../RenderRazorpayPopup/RenderRazorpayPopup';
import { useState } from 'react';
import store from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export default function PriceCard({plan, setSelectedPlan, isActive}) {

  const { createOrderMutation, isSuccess, isPending } = useCreateOrder();
  const [orderResponse, setOrderResponse] = useState('');
  const [amount, setAmount] = useState(null);
  const { user, token } = store.getState().auth;
  const navigate = useNavigate();

  async function handlePayments(amount) {
    if(!user || !token) {
      navigate('/auth/signin');
      return;
    }
    setAmount(amount);
    if(amount == 0) return;
    const res = await createOrderMutation(amount*100);
    setOrderResponse(res);
  }

  return (
    <div
      key={plan.id}
      onClick={() => setSelectedPlan(plan.id)}
      className={`group cursor-pointer rounded-2xl border border-[#767676] p-8 transition-all duration-300 shadow-sm 
        ${
          isActive
            ? "ring-2 ring-purple-500 scale-105"
            : "hover:ring-1 hover:ring-purple-400 hover:scale-[1.02]"
        }
        bg-card text-card-foreground border-border`}
    >
      <div className="flex flex-col items-start">
        <h3 className="text-2xl font-bold">{plan.title}</h3>
        <p className="text-3xl font-extrabold mt-2">
          {plan?.price === '0' ? plan?.price : `₹${plan?.price}/mon`}
        </p>
      </div>

      <ul className="mt-6 space-y-4">
        {plan.features.map((feature, idx) => (
          <li
            key={idx}
            className="flex items-center justify-start gap-2 text-sm text-muted-foreground"
          >
            <Check className="w-5 h-5 text-purple-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 flex gap-2 items-center justify-center w-full py-2 px-4 rounded-xl font-semibold transition-colors duration-200 
          ${
            isActive
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-muted text-foreground hover:bg-muted/70"
          }`}
        onClick={() => handlePayments(plan.price)}
        disabled={isPending}
      >
        {plan.id === "free" ? "Start for Free" : "Choose Plan"}
        { isPending && `Taking you to razorpay` }
        { isPending && (<LucideLoader className='animate-spin ml-2' />)}
      </button>
      { isSuccess && <RenderRazorpayPopup 
        amount={amount*100}
        keyId={import.meta.env.VITE_RAZORPAY_KEY_ID}
        orderId={orderResponse.id}
        currency={'INR'}
      />}
    </div>
  );
}
