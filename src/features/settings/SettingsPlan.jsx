/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useCurrentUser } from "../../hooks/useAuth";
import { useUpdateUser } from "./useUpdateUser";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";

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

export default function SettingsPlan() {
  const {
    profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useCurrentUser();

  const { updateUser, isUpdating } = useUpdateUser();

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size={40} />
      </div>
    );
  }
  if (isProfileError) {
    return (
      <div className="flex justify-center items-center h-64">
        <ErrorNotice
          title="Couldn’t load plan"
          message={profileError.message}
        />
      </div>
    );
  }

  const selectedPlan = profile?.plan;

  const onSelect = (planId) => {
    if (planId === selectedPlan) return;
    updateUser({ plan: planId });
  };

  return (
    <div
      className={`flex flex-row justify-center gap-8 h-[50vh] ${
        isUpdating ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {PLANS.map((p) => {
        const isSelected = p.id === selectedPlan;
        return (
          <motion.div
            key={p.id}
            onClick={() => onSelect(p.id)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`
              cursor-pointer h-full p-6 rounded-lg border-2 flex flex-col justify-between  w-1/3
              ${
                isSelected
                  ? "border-bordo-500 bg-bordo-500/10"
                  : "border-gray-700 bg-gray-900"
              }
            `}
          >
            <div>
              <h3 className="text-2xl font-semibold">{p.label}</h3>
              <p className="mt-2 text-lg text-siva-200">{p.price}</p>
              <ul className="mt-12 space-y-3 text-siva-200">
                {p.features.map((f) => (
                  <li key={f} className="list-disc list-inside">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {isSelected && (
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
