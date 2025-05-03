import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

const steps = [
  { path: "info", title: "Registration" },
  { path: "genres", title: "Favourite genres" },
  { path: "platforms", title: "Platforms you use" },
  { path: "actors", title: "Your favourite actors" },
  { path: "payment-plan", title: "Choose your plan" },
  { path: "finish", title: "All set!" },
];

export default function RegisterLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // figure out which step we’re on by matching the last path segment
  const currentStep = location.pathname.split("/").pop();
  const currentIndex = steps.findIndex((s) => s.path === currentStep);

  const isFirst = currentIndex <= 0;
  const isLast = currentIndex === steps.length - 1;

  const goNext = () => {
    if (!isLast) {
      navigate(`/${steps[currentIndex + 1].path}`);
    }
  };
  const goBack = () => {
    if (!isFirst) {
      navigate(`/${steps[currentIndex - 1].path}`);
    } else {
      navigate("/landing-page"); // or to “/” if you want to force home
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="relative bg-siva-800 rounded-xl w-full max-w-3xl p-8 text-white">
        {/* Step title */}
        <h1 className="text-4xl font-semibold text-center mb-6">
          {steps[currentIndex]?.title}
        </h1>

        {/* Page content */}
        <div className="mb-12">
          <Outlet />
        </div>

        {/* Back / Next buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={isFirst}
            className="flex items-center gap-2 text-white/60 hover:text-white disabled:opacity-50"
          >
            <Icon icon="mdi:arrow-left-thick" width="24" />
            Back
          </button>

          {!isLast && (
            <button
              onClick={goNext}
              className="flex items-center gap-2 bg-bordo-500 px-4 py-2 rounded hover:bg-bordo-400"
            >
              Next
              <Icon icon="mdi:arrow-right-thick" width="24" />
            </button>
          )}
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition ${
                idx <= currentIndex ? "bg-bordo-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
