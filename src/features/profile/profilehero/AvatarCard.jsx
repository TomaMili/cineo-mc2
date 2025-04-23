import { Icon } from "@iconify-icon/react";
import { useNavigate } from "react-router-dom";

export default function AvatarCard({
  src = "/profile-avatar.png",
  name = "Username",
  subtitle = "The Adventurer",
  trophyCount = "8/45",
}) {
  const navigate = useNavigate();
  return (
    <div className="relative bg-siva-800 rounded-t-4xl px-8  ">
      <img
        src={src}
        alt="avatar"
        className="w-68 h-68 rounded-full border-4 border-black object-cover mx-auto -mt-44"
      />
      <h3 className="mt-4 text-5xl font-semibold text-center text-white">
        {name}
      </h3>
      <p className="text-center text-lg uppercase text-gray-300 mt-8">
        {subtitle}
      </p>
      <div className="mt-2 flex flex-col items-center text-yellow-400">
        <Icon
          icon="material-symbols:trophy-outline-sharp"
          width="36"
          height="36"
          onClick={() => navigate(`./achievements`)}
          className="cursor-pointer"
        />
        <span className="text-lg text-gray-200">{trophyCount}</span>
      </div>
    </div>
  );
}
