import { useEffect, useState } from "react";

const API_KEY = 123;

const Inception = () => {
  const [movie, setMovie] = useState(null);
  //   const [providers, setProviders] = useState(null);
  //   const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch();
        //   `https://api.themoviedb.org/3/movie/696506?api_key=${API_KEY}&language=en-US`
        //   `https://api.themoviedb.org/3/movie/680/videos?api_key=${API_KEY}&language=en-US`
        //   `https://api.themoviedb.org/3/movie/680/images?api_key=${API_KEY}`
        //   `https://api.themoviedb.org/3/movie/278/watch/providers?api_key=${API_KEY}&language=en-US?locale=HR`
        //   `https://api.themoviedb.org/3/movie/278/reviews?api_key=${API_KEY}&language=en-US`
        const data = await res.json();
        // const croatiaProviders = data.results?.UK || null;
        // setProviders(croatiaProviders);
        setMovie(data);

        // const trailer = data.results.find(
        //   (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        // );

        // if (trailer) setVideo(trailer.key);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, []);

  if (!movie) return <div>Loading...</div>;
  //   console.log(movie.results.GB.rent[0].provider_name);
  console.log(movie);
  //   console.log(movie.results[10].author);
  //   console.log(movie.results[10].author_details.rating);
  //   console.log(movie.results[6].content);
  //   console.log(movie.results?.HR?.flatrate?.[0]?.provider_name || null);
  //   console.log(movie.results?.US?.flatrate?.[0]?.provider_name || null);
  //   console.log(movie.results.HR.rent[0].provider_name);
  //   console.log(movie.results.HR.buy[0].provider_name);

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="italic text-gray-600">{movie.tagline}</p>
      <p className="mt-2">{movie.overview}</p> */}
      {/* <p className="mt-2">{providers}</p> */}
      {/* <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mt-4 rounded-xl"
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        className="mt-4 rounded-xl"
      /> */}
      {/* <iframe
        src={`https://www.youtube.com/embed/${video}`}
        title="Movie Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-400 h-300 rounded-xl shadow-lg"
        width={800}
        height={400}
      ></iframe> */}
      {/* <img
        src={`https://image.tmdb.org/t/p/w500${movie.backdrops[0].file_path}`}
        alt={movie.id}
        className="mt-4 rounded-xl"
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.logos[40].file_path}`}
        alt={movie.id}
        className="mt-4 rounded-xl"
      />
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.posters[0].file_path}`}
        alt={movie.id}
        className="mt-4 rounded-xl"
      /> */}
    </div>
  );
};

export default Inception;
