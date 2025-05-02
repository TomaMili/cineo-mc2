import AvatarCard from "./AvatarCard";
import DonutChart from "./DonutChart";
import ActivityChart from "./ActivityChart";
import { useUserProfile } from "../../../hooks/useUsers";
import { useUserAchievements } from "../../../hooks/useAchievements";
import ErrorNotice from "../../../ui/ErrorNotice";
import Spinner from "../../../ui/Spinner";

export default function ProfileHero() {
  const userId = 1; // TODO real session
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
      className="w-full bg-cover bg-center -mt-24"
      style={{ backgroundImage: "url(/bg-image.jpg)" }}
    >
      <h2 className="text-4xl font-medium text-white text-center pt-10 pb-40 md:pb-0 mb-20 md:mb-10">
        PROFILE
      </h2>

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center md:flex-row md:items-end md:justify-around gap-3">
        <AvatarCard
          // src={profile.avatarUrl || "/profile-avatar.png"}
          name={profile.username.toUpperCase() || "Anonymous"}
          // subtitle={`Favourite actor: ${profile.favActor ?? "—"}`}
          trophyCount={`${completed}/${19}`}
        />

        <div className="flex flex-col items-center gap-6 pb-10">
          <DonutChart data={profile.donutData} total={profile.watchedCount} />
          <ActivityChart data={profile.activityData} />
        </div>
      </div>
    </div>
  );
}
