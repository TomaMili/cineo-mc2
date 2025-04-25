// src/pages/MovieDetail.jsx
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchMovieDetails, findDirector } from "../../services/apiTmdb";

import { useRegion } from "../../hooks/useRegion";
import { useProviders } from "../../hooks/useProviders";
import { useTrailerKey } from "../../hooks/useTrailerKey";

import MovieHero from "../../features/movie/MovieHero";
import TrailerSection from "../../features/movie/TrailerSection";
import CastSection from "../../features/movie/CastSection";
import ReviewsSection from "../../features/movie/ReviewsSection";
import { useReviews } from "../../hooks/useReviews";
import SimilarMoviesSection from "../../features/movie/SimilarMovies";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";

export default function MovieDetail() {
  const queryClient = useQueryClient();
  const { movieId } = useParams();

  const {
    data: details,
    isPending: loadingDetails,
    error: detailsError,
  } = useQuery({
    queryKey: ["movie", movieId],
    enabled: !!movieId,
    queryFn: ({ signal }) => fetchMovieDetails(movieId, signal),
    staleTime: 600_000, // 10 min
  });

  const { data: reviews } = useReviews(movieId);

  const { data: region } = useRegion();
  const { data: providers } = useProviders(movieId, region);

  const youtubeKey = useTrailerKey(details);

  const director = findDirector(details?.credits);

  if (loadingDetails)
    return (
      <div className="flex items-center justify-center h-screen -mt-24 bg-black">
        <Spinner size={48} color="text-bordo-400" />
      </div>
    );
  if (detailsError)
    return (
      <div className="flex items-center justify-center h-screen -mt-24 bg-black">
        <ErrorNotice
          title="Unable to load movie data"
          message={detailsError.message}
          onRetry={() =>
            queryClient.invalidateQueries({ queryKey: ["movie", movieId] })
          }
        />
      </div>
    );

  if (!details)
    return (
      <div className="flex items-center justify-center h-screen -mt-24 bg-black">
        <ErrorNotice title="Movie not found" />
      </div>
    );

  console.log(details);
  return (
    <article className="flex flex-col bg-black">
      <MovieHero details={details} director={director} providers={providers} />

      <TrailerSection youtubeKey={youtubeKey} />
      <hr className="mb-30 border-0.5 border-siva-300/30 mx-10" />
      <CastSection slides={details.credits?.cast ?? []} />
      <ReviewsSection reviews={reviews?.results ?? []} />
      <SimilarMoviesSection
        movieId={movieId}
        onWatchLater={(m) => console.log("Watch later:", m)}
        onBookmark={(m) => console.log("Bookmark:", m)}
      />
    </article>
  );
}
