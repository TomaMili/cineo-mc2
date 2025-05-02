import { profileImage } from "../../services/apiTmdb";
import ActorPlaceholder from "../../utils/actorPlacholder";

export default function CastCard({
  cast,
  onClick = () => {},
  hideRole = false,
}) {
  return (
    <div
      className="group relative w-28 sm:w-32 lg:w-36 xl:w-40 cursor-pointer"
      onClick={() => onClick(cast)}
    >
      {cast.profile_path ? (
        <div className="pt-2 h-full">
          <img
            src={
              cast.profile_path
                ? profileImage(cast.profile_path)
                : "/fallback-person.png"
            }
            alt={cast.name}
            className="w-full rounded-lg transition-transform duration-300 ease-out hover:scale-103 object-cover h-full "
          />
        </div>
      ) : (
        <ActorPlaceholder name={cast.name} />
      )}

      <p className="mt-2 text-xs sm:text-sm font-medium text-siva-100 line-clamp-1">
        {cast.name}
      </p>

      {!hideRole && (
        <p className="text-[10px] sm:text-xs text-siva-300 line-clamp-1">
          {cast.character}
        </p>
      )}
    </div>
  );
}
