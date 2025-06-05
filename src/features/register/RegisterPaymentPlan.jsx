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
      "Save up to 30 movies",
      "Basic recommendations",
      "SuperSuggest integration",
    ],
  },
  {
    id: "premium",
    label: "Premium",
    price: "5 € / month",
    features: [
      "Unlimited saved movies",
      "Advanced AI recommendations",
      "Watch-together features",
      "Integrated streaming services",
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
              cursor-pointer p-6 rounded-lg border-2 flex flex-col justify-between lg:h-120 h-100
              ${
                selected
                  ? "border-bordo-500 bg-bordo-500/10"
                  : "border-gray-700 bg-gray-900"
              }
            `}
          >
            <div className="h-full">
              <h3 className="text-xl lg:text-2xl font-semibold">{p.label}</h3>
              <p className="mt-2 text-md lg:text-lg text-siva-200">{p.price}</p>

              <ul className="mt-6 lg:mt-12 font-light space-y-3 lg:space-y-6 list-none list-inside text-lg text-siva-200">
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
