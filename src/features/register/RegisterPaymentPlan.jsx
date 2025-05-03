// src/features/register/RegisterPaymentPlan.jsx
import { useEffect } from "react";
import { useRegistration } from "./RegistrationContext";

const PLANS = [
  { id: "free", label: "Free", price: "0€ / month" },
  { id: "premium", label: "Premium", price: "10€ / month" },
];

export default function RegisterPaymentPlan() {
  const { data, update } = useRegistration();
  const { plan } = data;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("step-valid", { detail: !!plan }));
  }, [plan]);

  return (
    <div className="grid grid-cols-2 gap-6">
      {PLANS.map((p) => (
        <div
          key={p.id}
          onClick={() => update({ plan: p.id })}
          className={`cursor-pointer p-6 rounded-lg border transition ${
            plan === p.id
              ? "border-bordo-500 bg-bordo-500/20"
              : "border-gray-600"
          }`}
        >
          <h3 className="text-2xl">{p.label}</h3>
          <p className="mt-2">{p.price}</p>
        </div>
      ))}
    </div>
  );
}
