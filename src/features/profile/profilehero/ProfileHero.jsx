import AvatarCard from "./AvatarCard";
import DonutChart from "./DonutChart";
import ActivityChart from "./ActivityChart";

const donutData = [
  { name: "Drama", value: 30, fill: "#DC2626" },
  { name: "Sci-Fi", value: 20, fill: "#FBBF24" },
  { name: "Comedy", value: 25, fill: "#6B21A8" },
  { name: "Other", value: 20, fill: "#D1D5DB" },
];

const activityData = [
  { day: "Mon", Drama: 2, Comedy: 5 },
  { day: "Tue", Drama: 1, SciFi: 2, Comedy: 0 },
  { day: "Wed", Drama: 3, Comedy: 5 },
  { day: "Thu", Drama: 1, Other: 2 },
  { day: "Fri", Comedy: 4 },
  { day: "Sat", SciFi: 6, Comedy: 6 },
  { day: "Sun", Drama: 2, Other: 4 },
];

function ProfileHero() {
  return (
    <div
      className="w-full bg-cover bg-center -mt-24"
      style={{ backgroundImage: "url(/bg-image.jpg)" }}
    >
      <h2 className="text-4xl font-medium text-white text-center pt-10 pb-40 md:pb-0  mb-20 md:mb-10">
        PROFILE
      </h2>

      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center md:flex-row md:items-end md:justify-around gap-3">
        <AvatarCard
          src="/profile-avatar.png"
          name="Username"
          subtitle="The Adventurer"
          trophyCount="8/45"
        />

        <div className="flex flex-col items-center gap-6 pb-10">
          <DonutChart data={donutData} total={95} />
          <ActivityChart data={activityData} />
        </div>
      </div>
    </div>
  );
}

export default ProfileHero;
