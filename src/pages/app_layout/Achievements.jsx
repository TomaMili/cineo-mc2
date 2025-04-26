import { Icon } from "@iconify-icon/react";

const dummyAchievements = [
  {
    id: 1,
    title: "FIRST MOVIE",
    description: "Added your first movie",
    date: "02/04/2025",
    percent: 8.6,
    completed: true,
    rarity: 8.6, // % of users who have it
  },
  {
    id: 2,
    title: "MARATHON MASTER",
    description: "Watched 10 movies in one day",
    date: "10/03/2025",
    percent: 5.2,
    completed: true,
    rarity: 5.2,
  },
  {
    id: 3,
    title: "GENRE COLLECTOR",
    description: "Watched all genres",
    date: "15/02/2025",
    percent: 3.1,
    completed: true,
    rarity: 3.1,
  },
  {
    id: 4,
    title: "BINGE KING",
    description: "Watched 5 movies back-to-back",
    date: "21/01/2025",
    percent: 12.0,
    completed: true,
    rarity: 12.0,
  },
  {
    id: 5,
    title: "WEEKEND WARRIOR",
    description: "Watched on 3 consecutive weekends",
    date: "28/12/2024",
    percent: 20.0,
    completed: false,
    rarity: 20.0,
  },
  {
    id: 6,
    title: "EARLY BIRD",
    description: "Watched a movie before 6am",
    date: "05/01/2025",
    percent: 15.0,
    completed: false,
    rarity: 15.0,
  },
  {
    id: 7,
    title: "CRITIC",
    description: "Left 20 reviews",
    date: "30/11/2024",
    percent: 25.0,
    completed: false,
    rarity: 25.0,
  },
];

export default function Achievements() {
  const total = dummyAchievements.length;
  const completedCount = dummyAchievements.filter((a) => a.completed).length;
  const completionPct = Math.round((completedCount / total) * 100);

  // top 3 rarest achievements (lowest percent)
  const rarest = [...dummyAchievements]
    .sort((a, b) => a.rarity - b.rarity)
    .slice(0, 3);

  return (
    <div className="min-h-screen -mt-24 bg-siva-800 text-white px-6 py-8">
      <h2 className="text-4xl uppercase font-medium text-white text-center pt-10 pb-40 md:pb-0  mb-20 md:mb-10">
        achievements
      </h2>

      <h3 className="text-2xl font-light mb-3 mt-20">Rarest achievements:</h3>
      <div className="flex flex-wrap gap-6 my-12 items-center justify-center">
        {rarest.map((ach) => (
          <div
            key={ach.id}
            className="bg-bordo-500 rounded-lg p-5 w-64 space-y-2"
          >
            <div className="flex justify-center">
              <Icon
                icon="material-symbols:trophy-outline-sharp"
                width="36"
                height="36"
                className="text-white"
              />
            </div>
            <h3 className="text-2xl font-semibold text-center">{ach.title}</h3>
            <p className="text-center text-gray-200">{ach.description}</p>
            <p className="text-center text-gray-300">{ach.date}</p>
            <p className="text-yellow-400 text-sm">
              {ach.percent}% of users have this achievement
            </p>
          </div>
        ))}
      </div>

      <div className="mb-6 text-2xl font-light">
        Your achievement progress:{" "}
        <span className="font-bold">
          {completedCount}/{total}
        </span>
        <span className="text-lg ml-1">({completionPct}%)</span>
      </div>

      <div className="space-y-2 w-3/4  mx-auto">
        {dummyAchievements.map((ach) => (
          <div
            key={ach.id}
            className={`flex items-center justify-between rounded-lg p-4 ${
              ach.completed ? "bg-bordo-500" : "bg-siva-300/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <Icon
                icon="material-symbols:trophy-outline-sharp"
                width="32"
                height="32"
              />
              <div>
                <h4 className="text-xl font-semibold">{ach.title}</h4>
                <p className="text-gray-200">{ach.description}</p>
                {ach.completed && (
                  <p className="text-yellow-400 text-sm">
                    {ach.percent}% of users
                  </p>
                )}
              </div>
            </div>
            {ach.completed && <div className="text-gray-300">{ach.date}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
