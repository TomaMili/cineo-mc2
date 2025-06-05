/* eslint-disable no-unused-vars */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const steps = [
  { path: "info", title: "Registration" },
  { path: "genres", title: "Favourite genres" },
  { path: "platforms", title: "Platforms you use" },
  { path: "actors", title: "Your favourite actors" },
  { path: "payment-plan", title: "Choose your plan" },
  { path: "finish", title: "" },
];

export default function RegisterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStep = location.pathname.split("/").pop();
  const currentIndex = steps.findIndex((s) => s.path === currentStep);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === steps.length - 1;

  const [stepValid, setStepValid] = useState(false);
  useEffect(() => {
    const handler = (e) => setStepValid(Boolean(e.detail));
    window.addEventListener("step-valid", handler);
    return () => window.removeEventListener("step-valid", handler);
  }, [currentIndex]);

  const goBack = () =>
    isFirst
      ? navigate("/landing-page")
      : navigate(`/${steps[currentIndex - 1].path}`);
  const goNext = () => {
    if (!stepValid || isLast) return;
    navigate(`/${steps[currentIndex + 1].path}`);
  };

  return (
    <div className="min-h-screen bg-[url(/bg-image.jpg)] bg-cover flex items-center justify-center px-4">
      <div className="relative bg-siva-800/70 bg-opacity-70 backdrop-blur-xl rounded-2xl  w-full max-w-3xl lg:max-w-4xl p-8 text-white">
        <h1 className="text-4xl font-normal text-center mb-6">
          {steps[currentIndex].title}
        </h1>
        <div className="relative mb-12 min-h-[440px] ">
          <AnimatePresence>
            <motion.div
              mode="wait"
              key={currentStep}
              initial={{ opacity: 1, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-40 cursor-pointer"
            disabled={false}
          >
            <Icon icon="mdi:arrow-left-thick" width="24" />
            Back
          </button>

          {!isLast && (
            <button
              onClick={goNext}
              disabled={!stepValid}
              className={`flex items-center gap-2 py-3 rounded-full text-white font-medium transition ${
                stepValid
                  ? "bg-bordo-500 hover:bg-bordo-400 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              Next
              <Icon icon="mdi:arrow-right-thick" width="24" />
            </button>
          )}
        </div>
        {!isLast && (
          <div className=" w-fit flex items-center mx-auto">
            {steps.map((_, i) => (
              <div key={i} className="flex items-center">
                <span
                  className={`w-4 h-4 lg:w-6 lg:h-6 rounded-full transition ${
                    i <= currentIndex
                      ? "bg-bordo-500"
                      : "border-1 border-white/30"
                  }`}
                />
                {i < steps.length - 1 && (
                  <span
                    className={`w-7 lg:w-14 h-[1px]  transition ${
                      i < currentIndex ? "bg-bordo-500" : "bg-white/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
