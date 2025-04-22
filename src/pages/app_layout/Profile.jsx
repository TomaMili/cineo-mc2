import ProfileHero from "../../features/profile/ProfileHero";
import Favorites from "../../features/profile/Favorites";
// import RecentlyWatched from "../../features/profile/RecentlyWatched";

export default function Profile() {
  return (
    <div className="text-white">
      <ProfileHero />
      <Favorites />
      {/* <RecentlyWatched />  */}
    </div>
  );
}
