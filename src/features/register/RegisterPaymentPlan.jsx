/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRegistration } from "./RegistrationContext";

const PLANS = [
  {
    id: "free",
    label: "Free",
    price: "0 € / month",
    features: [
      "Save up to 10 movies",
      "Basic recommendations",
      "Community forums access",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    price: "10 € / month",
    features: [
      "Unlimited saved movies",
      "Advanced AI recommendations",
      "Priority support",
      "Early access to new features",
    ],
  },
];

export default function RegisterPaymentPlan() {
  const { data, update } = useRegistration();
  const { plan } = data;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step-valid", { detail: Boolean(plan) })
    );
  }, [plan]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
      {PLANS.map((p) => {
        const selected = plan === p.id;
        return (
          <motion.div
            key={p.id}
            onClick={() => update({ plan: p.id })}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`
              cursor-pointer p-6 rounded-lg border-2 flex flex-col justify-between
              ${
                selected
                  ? "border-bordo-500 bg-bordo-500/10"
                  : "border-gray-700 bg-gray-900"
              }
            `}
          >
            <div>
              <h3 className="text-2xl font-semibold">{p.label}</h3>
              <p className="mt-2 text-lg text-siva-200">{p.price}</p>

              <ul className="mt-8 font-light space-y-2 list-none list-inside text-lg text-siva-100">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            {selected && (
              <div className="mt-4 text-center text-bordo-500 font-medium">
                ✓ Selected
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
