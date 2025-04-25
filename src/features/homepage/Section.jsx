import MovieCarousel from "../../ui/MovieCarousel";

function Section({ title, movies }) {
  if (!movies?.length) return null;

  const OPTIONS = { align: "start" };

  return (
    <>
      <h2 className="text-3xl font-medium mt-20 first:mt-0">{title}</h2>
      <MovieCarousel slides={movies} options={OPTIONS} />
    </>
  );
}

export default Section;
