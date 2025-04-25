import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";

export default function RatingOverlay({ onRate, onRateLater }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 rounded-lg z-10">
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onRate(n)}
            className="focus:outline-none"
          >
            <Icon
              icon={hovered >= n ? "mdi:star" : "mdi:star-outline"}
              width="32"
              height="32"
              className="text-yellow-400"
            />
          </button>
        ))}
      </div>
      <button
        onClick={onRateLater}
        className="bg-bordo-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
      >
        Rate later
      </button>
    </div>
  );
}
