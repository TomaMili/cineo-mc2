import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { poster, fetchMovieDetails } from "../../services/apiTmdb";

const PERSON_PLACEHOLDER = "https://via.placeholder.com/342x513?text=No+Image";
const DUMMY_FAV = {
  actor: { id: 31, name: "Tom Hanks", count: 7 },
  director: { id: 181, name: "Guy Ritchie", count: 12 },
  movie: { id: 497, name: "The Green Mile", count: 3 },
};

export default function ProfileHero() {
  const [favActorImg, setFavActorImg] = useState(null);
  const [favDirectorImg, setFavDirectorImg] = useState(null);
  const [favMovieImg, setFavMovieImg] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    async function loadFavImages() {
      try {
        const [actor, director, movie] = await Promise.all([
          fetchMovieDetails(DUMMY_FAV.actor.id, ctrl.signal),
          fetchMovieDetails(DUMMY_FAV.director.id, ctrl.signal),
          fetchMovieDetails(DUMMY_FAV.movie.id, ctrl.signal),
        ]);
        setFavActorImg(actor.profile_path);
        setFavDirectorImg(director.profile_path);
        setFavMovieImg(movie.poster_path);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      }
    }
    loadFavImages();
    return () => ctrl.abort();
  }, []);

  // chart data
  const donutData = [
    { name: "Drama", value: 30, fill: "#DC2626" },
    { name: "Sci‐Fi", value: 20, fill: "#FBBF24" },
    { name: "Comedy", value: 25, fill: "#6B21A8" },
    { name: "Other", value: 20, fill: "#D1D5DB" },
  ];
  const activity = [
    { day: "M", value: 5, color: "#6B21A8" },
    { day: "T", value: 2, color: "#D1D5DB" },
    { day: "W", value: 8, color: "#DC2626" },
    { day: "T", value: 3, color: "#D1D5DB" },
    { day: "F", value: 4, color: "#6B21A8" },
    { day: "S", value: 12, color: "#6B21A8" },
    { day: "S", value: 6, color: "#FBBF24" },
  ];

  return (
    <div className="gap-6 z-0 bg-[url(/bg-image.jpg)] -mt-24 pt-50 pb-28">
      <div className="max-w-6xl mx-auto p-6 flex items-center justify-around">
        {/* Avatar + stats card */}
        <div className="relative bg-black/80 rounded-2xl pt-16 px-8 pb-8 w-80">
          <img
            src={PERSON_PLACEHOLDER}
            alt="avatar"
            className="w-48 h-48 rounded-full border-4 border-black object-cover mx-auto -mt-24"
          />
          <h1 className="mt-4 text-3xl font-bold text-center">Username</h1>
          <p className="text-center text-lg uppercase text-gray-300 mt-2">
            The Adventurer
          </p>
          <div className="flex justify-center items-center space-x-2 mt-4 text-yellow-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27 ... Z" />
            </svg>
            <span className="text-lg text-gray-200">8/45</span>
          </div>
        </div>
        {/* Charts */}
        <div className="flex space-x-8">
          <div className="w-40 h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  isAnimationActive
                />
                {donutData.map((e) => (
                  <Cell key={e.name} fill={e.fill} />
                ))}
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white">95</span>
              <span className="text-xs uppercase text-gray-300">
                movies watched
              </span>
            </div>
          </div>
          <div className="w-64 h-32 bg-black/60 rounded-lg p-2">
            <h3 className="text-white text-center mb-1">ACTIVITY</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={activity}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: "white" }}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Bar dataKey="value">
                  {activity.map((a) => (
                    <Cell key={a.day} fill={a.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
