import { poster, profileImage } from "../../services/apiTmdb";
import usePerson from "../../hooks/usePerson";
import useMovie from "../../hooks/useMovie";
import ErrorNotice from "../../ui/ErrorNotice";
import SkeletonPoster from "../../ui/SkeletonPoster";

const PERSON_PLACEHOLDER = "https://via.placeholder.com/342x513?text=No+Image";

function Favorites() {
  const {
    data: actor,
    isLoading: actorLoading,
    isError: actorErr,
    error: actorErrObj,
  } = usePerson(31);

  const {
    data: director,
    isLoading: directorLoading,
    isError: directorErr,
    error: directorErrObj,
  } = usePerson(956);

  const {
    data: movie,
    isLoading: movieLoading,
    isError: movieErr,
    error: movieErrObj,
  } = useMovie(497);

  const isLoading = actorLoading || directorLoading || movieLoading;
  const isError = actorErr || directorErr || movieErr;

  const errMsg =
    actorErrObj?.message || directorErrObj?.message || movieErrObj?.message;

  console.log(movie);

  if (isLoading)
    return (
      <>
        <div className="max-w-5xl mx-auto mt-13 mb-25 space-y-2 flex justify-around text-center text-white">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonPoster key={i} />
          ))}
        </div>
      </>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-full mt-24 mb-45.5">
        <ErrorNotice title="Unable to load data" message={errMsg} />
      </div>
    );

  const items = [
    {
      title: "FAVOURITE ACTOR",
      name: actor?.name,
      label: `13 movies watched`,
      imgPath: actor?.profile_path,
      isPerson: true,
    },
    {
      title: "FAVOURITE DIRECTOR",
      name: director?.name,
      label: `4 movies watched`,
      imgPath: director?.profile_path,
      isPerson: true,
    },
    {
      title: "FAVOURITE MOVIE",
      name: movie?.title,
      label: `13 times watched`,
      imgPath: movie?.poster_path,
      isPerson: false,
    },
  ];

  return (
    <div
      className="max-w-5xl mx-auto  my-12 grid 
                    grid-cols-1 md:grid-cols-3 gap-y-8 
                    justify-items-center text-center text-white"
    >
      {items.map(({ title, name, label, imgPath, isPerson }) => (
        <div key={title} className="space-y-2">
          <h4 className="text-lg font-semibold">{title}</h4>
          <img
            src={
              imgPath
                ? isPerson
                  ? profileImage(imgPath)
                  : poster(imgPath)
                : PERSON_PLACEHOLDER
            }
            alt={name}
            className="mx-auto w-48 h-64 object-cover rounded-lg"
          />
          <p className="mt-1 font-medium">{name}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorites;
