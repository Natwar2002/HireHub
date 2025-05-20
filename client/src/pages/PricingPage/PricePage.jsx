
import { useState } from 'react';
import PriceCard from '../../component/pricingCards/PriceCards';


const plans = [
  {
    id: 'free',
    title: 'Free',
    price: '0',
    features: [
      'Apply to jobs',
      'See application updates',
    ],
  },
  {
    id: 'pro',
    title: 'Pro',
    price: '449',
    features: [
      'Everything in Free',
      'Early access to job posts',
      'See recruiter actions',
    ],
  },
  {
    id: 'premium',
    title: 'Premium',
    price: '999',
    features: [
      'Everything in Pro',
      'Contact recruiter via email or phone',
      'Chat with recruiter directly',
    ],
  },
];

export default function PricePage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto text-right">
        <h2 className="text-4xl font-extrabold">Choose Your Plan</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Select the plan that fits your job search needs.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const isActive = plan.id === selectedPlan;

          return (
           <PriceCard isActive={isActive} plan={plan} setSelectedPlan={setSelectedPlan} key={plan.id}/>
          );
        })}
      </div>
    </section>
  );
}
