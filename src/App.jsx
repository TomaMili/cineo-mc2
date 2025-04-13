import Inception from "./Inception";
import MovieCarousel from "./ui/MovieCarousel";

const OPTIONS = { align: "start" };
const SLIDE_COUNT = 6;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

// const movies = [
//   { id: "1", title: "Inception", posterUrl: "src/img/inception.jpg" },
//   { id: "2", title: "Interstellar", posterUrl: "src/img/inception.jpg" },
//   { id: "3", title: "Tenet", posterUrl: "src/img/inception.jpg" },
// ];

function App() {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      {/* <Inception /> */}
      <div className="">
        <MovieCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}

export default App;
