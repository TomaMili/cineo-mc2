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
    <div className="z-30 flex items-center justify-between px-10 sm:px-8 sm:w-xl md:w-3xl xl:w-6xl sm:mx-auto">
      <div className="flex flex-col rounded-t-4xl w-fit items-center">
        <img
          src={src}
          alt="avatar"
          className="w-36 h-36 sm:w-68 sm:h-68 rounded-full border-4 border-black object-cover sm:mx-auto"
        />
        <h3 className="mt-4 text-2xl sm:text-5xl font-medium text-siva-100 w-fit">
          {name}
        </h3>
        <p className="text-lg sm:text-xl uppercase text-siva-300 w-fit">
          {subtitle}
        </p>
      </div>
      <div
        onClick={() => navigate(`./achievements`)}
        className="cursor-pointer mb-10 flex flex-col items-center text-yellow-400 bg-bordo-500  hover:bg-bordo-400 rounded-lg mr-6 sm:mr-12 px-4 py-2 sm:px-5 sm:py-4 h-fit "
      >
        <Icon
          icon="material-symbols:trophy-outline-sharp"
          width="36"
          height="36"
        />
        <span className="text-lg sm:text-2xl text-gray-200">{trophyCount}</span>
      </div>
    </div>
  );
}
