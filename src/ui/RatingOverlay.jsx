import { useState } from "react";
import { Icon } from "@iconify-icon/react";

export default function RatingOverlay({ onRate, onRateLater, onClose }) {
  const [hovered, setHovered] = useState(0);

  const close = onClose ?? onRateLater;

  return (
    <div
      className="absolute inset-0 bg-black/80 flex items-center justify-center z-20 rounded-lg"
      onClick={close}
    >
      <div
        className="flex flex-col items-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex mb-4 mt-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => onRate(n)}
              className="focus:outline-none cursor-pointer"
            >
              <Icon
                icon={
                  hovered >= n
                    ? "material-symbols:star-rounded"
                    : "material-symbols:star-outline-rounded"
                }
                width="34"
                height="34"
                className="text-yellow-400 rounded-lg"
              />
            </button>
          ))}
        </div>

        <button
          onClick={onRateLater}
          className="bg-bordo-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-bordo-400 transition"
        >
          Rate later
        </button>
      </div>
    </div>
  );
}
