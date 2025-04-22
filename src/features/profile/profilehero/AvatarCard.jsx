// src/features/profile/AvatarCard.jsx

import React from "react";
import { Icon } from "@iconify-icon/react";

export default function AvatarCard({
  src = "/profile-avatar.png",
  name = "Username",
  subtitle = "The Adventurer",
  trophyCount = "8/45",
}) {
  return (
    <div className="relative bg-black rounded-2xl px-8 pb-12 w-72">
      <img
        src={src}
        alt="avatar"
        className="w-48 h-48 rounded-full border-4 border-black object-cover mx-auto -mt-24"
      />
      <h3 className="mt-4 text-2xl font-semibold text-center text-white">
        {name}
      </h3>
      <p className="text-center text-lg uppercase text-gray-300 mt-1">
        {subtitle}
      </p>
      <div className="mt-4 flex flex-col items-center text-yellow-400">
        <Icon
          icon="material-symbols:trophy-outline-sharp"
          width="36"
          height="36"
        />
        <span className="text-lg text-gray-200">{trophyCount}</span>
      </div>
    </div>
  );
}
