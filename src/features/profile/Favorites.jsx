import { profileImage, poster } from "../../services/apiTmdb";
import { useUserProfile } from "../../hooks/useUsers";
import ErrorNotice from "../../ui/ErrorNotice";
import SkeletonPoster from "../../ui/SkeletonPoster";
import { useCurrentUser } from "../../hooks/useAuth";

const PLACEHOLDER = "https://via.placeholder.com/342x513?text=No+Image";

export default function Favorites() {
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const { data: p, isLoading, isError, error } = useUserProfile(userId);

  if (isLoading)
    return (
      <div className="max-w-5xl mx-auto mt-13 mb-25 flex justify-around">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonPoster key={i} />
        ))}
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-full mt-24 mb-45.5">
        <ErrorNotice title="Unable to load data" message={error.message} />
      </div>
    );

  const items = [
    {
      title: "FAVOURITE ACTOR",
      name: p.favActor ?? "—",
      count: p.favActorCount,
      img: p.favActorImg,
      isPerson: true,
    },
    {
      title: "FAVOURITE DIRECTOR",
      name: p.favDirector ?? "—",
      count: p.favDirectorCount,
      img: p.favDirectorImg,
      isPerson: true,
    },
    {
      title: "FAVOURITE MOVIE",
      name: p.favMovie ?? "—",
      count: p.favMovieCount,
      img: p.favMoviePoster,
      isPerson: false,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-12  z-40 flex justify-evenly flex-wrap gap-y-8 justify-items-center text-center text-siva-100 px-4 gap-4 lg:pt-20">
      {items.map(({ title, name, count, img, isPerson }) => (
        <div key={title} className="space-y-2">
          <h4 className="text-lg font-semibold">{title}</h4>

          <img
            src={
              img ? (isPerson ? profileImage(img) : poster(img)) : PLACEHOLDER
            }
            alt={name}
            className="mx-auto w-38 sm:w-44 lg:w-48 xl:w-52 aspect-[2/3] object-cover rounded-lg"
          />

          <p className="mt-1 font-medium">{name}</p>
          <p className="text-sm text-gray-400">
            {count > 0
              ? isPerson
                ? `Appears in ${count} movie${count > 1 ? "s" : ""}`
                : `Rated ${count} star${count > 1 ? "s" : ""}`
              : "—"}
          </p>
        </div>
      ))}
    </div>
  );
}
