// src/features/profile/Favorites.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  poster,
  profileImage,
  fetchMovieDetails,
  fetchPersonDetails,
} from "../../services/apiTmdb";

const PERSON_PLACEHOLDER = "https://via.placeholder.com/342x513?text=No+Image";

const DUMMY = {
  actor: { id: 31, name: "Tom Hanks", count: 7 },
  director: { id: 956, name: "Guy Ritchie", count: 12 },
  movie: { id: 497, name: "The Green Mile", count: 3 },
};

function usePerson(id) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: ({ signal }) => fetchPersonDetails(id, signal),
    staleTime: 1000 * 60 * 5,
  });
}

function useMovie(id) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: ({ signal }) => fetchMovieDetails(id, signal),
    staleTime: 1000 * 60 * 5,
  });
}

export default function Favorites() {
  const { data: actor } = usePerson(DUMMY.actor.id);
  const { data: director } = usePerson(DUMMY.director.id);
  const { data: movie } = useMovie(DUMMY.movie.id);

  const items = [
    {
      title: "FAVOURITE ACTOR",
      name: DUMMY.actor.name,
      label: `${DUMMY.actor.count} movies watched`,
      imgPath: actor?.profile_path,
      isPerson: true,
    },
    {
      title: "FAVOURITE DIRECTOR",
      name: DUMMY.director.name,
      label: `${DUMMY.director.count} movies watched`,
      imgPath: director?.profile_path,
      isPerson: true,
    },
    {
      title: "FAVOURITE MOVIE",
      name: DUMMY.movie.name,
      label: `${DUMMY.movie.count} times watched`,
      imgPath: movie?.poster_path,
      isPerson: false,
    },
  ];

  return (
    <div
      className="max-w-6xl mx-auto px-6 pb-20 mt-12 grid 
                    grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8 
                    justify-items-center text-center text-white"
    >
      {items.map(({ title, name, label, imgPath, isPerson }) => (
        <div key={title} className="space-y-2">
          <h4 className="text-lg font-semibold">{title}</h4>
          <img
            src={
              imgPath
                ? isPerson
                  ? profileImage(imgPath, 185)
                  : poster(imgPath, 342)
                : PERSON_PLACEHOLDER
            }
            alt={name}
            className="mx-auto w-full h-70 object-cover rounded-lg"
          />
          <p className="mt-1 font-medium">{name}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      ))}
    </div>
  );
}
