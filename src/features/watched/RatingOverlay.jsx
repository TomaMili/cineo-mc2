import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";

export default function RatingOverlay({ onRate, onRateLater }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 z-10 rounded-lg">
      <div className="flex space-x-2 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <Icon
            key={n}
            icon={hover >= n ? "mdi:star" : "mdi:star-outline"}
            width="28"
            height="28"
            className="cursor-pointer text-yellow-400"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRate(n)}
          />
        ))}
      </div>
      <button
        onClick={onRateLater}
        className="bg-bordo-500 px-6 py-2 rounded text-white"
      >
        Rate later
      </button>
    </div>
  );
}
