import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/Spinner";
import Section from "./Section";

export default function LazySection({ title, fetchHook, emptyMessage }) {
  // iOS Safari fix: fallbackInView ensures content loads even if IntersectionObserver fails
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: "400px",
    fallbackInView: true,
  });

  const query = fetchHook({ enabled: inView });

  if (query.isLoading) {
    return (
      <div ref={ref} className="pt-12 pb-36 flex justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div ref={ref} className="pt-12 pb-36 flex justify-center text-red-400">
        Couldn’t load <span className="ml-1 font-semibold">“{title}”</span>
      </div>
    );
  }

  const moviesProp =
    typeof query.fetchNextPage === "function"
      ? query
      : Array.isArray(query.data)
      ? query.data
      : query.data?.results ?? [];

  return (
    <div ref={ref}>
      <Section title={title} movies={moviesProp} emptyMessage={emptyMessage} />
    </div>
  );
}
