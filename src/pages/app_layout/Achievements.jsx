import { useUserAchievements } from "../../hooks/useAchievements";
import { Icon } from "@iconify-icon/react";
import ErrorNotice from "../../ui/ErrorNotice";
import Spinner from "../../ui/Spinner";

export default function Achievements() {
  const userId = 1; // replace with real session.id
  const { items, isLoading, error } = useUserAchievements(userId);

  if (!userId)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Achievements" message="No user" />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen bg-siva-800">
        <ErrorNotice title="Couldn't load Watched" message={error.message} />
      </div>
    );

  if (isLoading)
    return (
      <div className="h-screen -m-24 flex justify-center items-center">
        <Spinner size={46} />
      </div>
    );
  const completed = items.filter((a) => a.completed);
  const notFinished = items.filter((a) => !a.completed);

  return (
    <div className="min-h-screen  text-white px-6 py-8 -mt-24">
      <h2 className="text-4xl font-medium uppercase text-center pb-10 text-siva-100">
        Achievements
      </h2>

      {completed.length > 0 && (
        <>
          <h3 className="text-2xl font-light mb-4 text-siva-100">
            Completed Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {completed.map((a) => (
              <div
                key={a.key}
                className="bg-bordo-500 rounded-lg p-6 text-center"
              >
                <Icon
                  icon="material-symbols:trophy-outline-sharp"
                  width={36}
                  height={36}
                  className="text-yellow-300"
                />
                <h4 className="mt-2 text-xl font-semibold">{a.title}</h4>
                <p className="mt-1 text-sm text-gray-200">{a.desc}</p>
                <p className="mt-2 text-xs italic ">
                  Achieved on {new Date(a.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {notFinished.length > 0 && (
        <>
          <h3 className="text-2xl font-light mb-4 text-siva-100">
            Locked Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notFinished.map((a) => (
              <div
                key={a.key}
                className="bg-gray-800 text-gray-400 opacity-60 rounded-lg p-6 text-center"
              >
                <Icon
                  icon="material-symbols:trophy-outline-sharp"
                  width={36}
                  height={36}
                  className="text-gray-600"
                />
                <h4 className="mt-2 text-xl font-semibold">{a.title}</h4>
                <p className="mt-1 text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
