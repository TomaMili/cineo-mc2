import AvatarCard from "./AvatarCard";
import DonutChart from "./DonutChart";
import ActivityChart from "./ActivityChart";
import { useUserProfile } from "../../../hooks/useUsers";
import { useUserAchievements } from "../../../hooks/useAchievements";
import ErrorNotice from "../../../ui/ErrorNotice";
import Spinner from "../../../ui/Spinner";
import { useCurrentUser } from "../../../hooks/useAuth";

export default function ProfileHero() {
  const { profile: p } = useCurrentUser();
  const userId = p?.id;

  const { data: profile, isLoading, isError } = useUserProfile(userId);

  const { items } = useUserAchievements(userId);
  const completed = items.filter((a) => a.completed).length;

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Profile" message={isError.message} />
      </div>
    );

  if (isLoading)
    return (
      <div className="h-screen -m-24 flex justify-center items-center">
        <Spinner size={46} />
      </div>
    );

  return (
    <div
      className="w-full bg-cover bg-center -mt-24 relative z-10"
      style={{ backgroundImage: "url(/bg-image.jpg)" }}
    >
      <h2 className="text-3xl sm:text-4xl font-medium text-white text-center pt-22 sm:pt-26 pb-10 sm:pb-30">
        PROFILE
      </h2>

      <div className="flex flex-col relative h-fit">
        <div
          className="absolute bg-siva-800 w-full sm:top-40 top-22 z-20"
          style={{ height: "calc(100% - 5.5rem)" }}
        ></div>
        <AvatarCard
          name={p.username.toUpperCase() || "Anonymous"}
          trophyCount={`${completed}/${19}`}
        />
        <div className="z-40 w-full sm:w-xl md:w-3xl xl:w-5xl sm:mx-auto mt-20 lg:mt-40">
          <h2 className="text-xl sm:text-3xl font-medium text-white z-20 lg:text-left text-center pb-5">
            STATISTICS
          </h2>
          <div className="flex flex-col lg:flex-row justify-between items-center sm:px-0 px-10 z-40">
            <ActivityChart data={profile.activityData} />
            <DonutChart data={profile.donutData} total={profile.watchedCount} />
          </div>
        </div>
      </div>
    </div>
  );
}
