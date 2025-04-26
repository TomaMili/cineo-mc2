import React from "react";
import { useParams } from "react-router-dom";
import MovieCarousel from "../../ui/MovieCarousel";
import useCollections from "../../hooks/useCollections";

export default function CollectionDetail() {
  const { id } = useParams();
  const { data: cols = [], isLoading } = useCollections();
  if (isLoading) return <div className="text-white p-8">Loading…</div>;

  const col = cols.find((c) => c.id === id);
  if (!col) return <div className="text-white p-8">Not found</div>;

  return (
    <section className="min-h-screen bg-black text-white pb-12 pt-24 px-6 xl:px-12">
      <h1 className="text-4xl font-semibold mb-6">{col.name}</h1>
      <MovieCarousel
        slides={col.movies}
        options={{ align: "start" }}
        hideActions
      />
    </section>
  );
}
