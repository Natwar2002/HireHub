
import { Check } from "lucide-react";

export default function PriceCard({plan, setSelectedPlan, isActive}) {
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
        <p className="text-3xl font-extrabold mt-2">{plan.price}</p>
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
        className={`mt-8 w-full py-2 px-4 rounded-xl font-semibold transition-colors duration-200 
                ${
                  isActive
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
      >
        {plan.id === "free" ? "Start for Free" : "Choose Plan"}
      </button>
    </div>
  );
}
