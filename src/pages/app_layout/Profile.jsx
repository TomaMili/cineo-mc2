import ProfileHero from "../../features/profile/profilehero/ProfileHero";
import Favorites from "../../features/profile/Favorites";
import RecentlyWatched from "../../features/profile/RecentlyWatched";

export default function Profile() {
  return (
    <div className="text-siva-100">
      <ProfileHero />
      <Favorites />
      <RecentlyWatched />
    </div>
  );
}
