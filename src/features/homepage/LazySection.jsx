// src/features/homepage/LazySection.jsx
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/Spinner";
import Section from "./Section";

export default function LazySection({ title, fetchHook, emptyMessage }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const queryRef = useRef(null);

  if (inView && queryRef.current === null) {
    queryRef.current =
      typeof fetchHook === "function" && /^use[A-Z]/.test(fetchHook.name)
        ? fetchHook()
        : fetchHook();
  }

  if (queryRef.current === null) {
    return (
      <div ref={ref} className="pt-12 pb-36 flex justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  const query = queryRef.current;

  if (query.isLoading) {
    return (
      <div className="pt-12 pb-36 flex justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="pt-12 pb-36 flex justify-center text-red-400">
        Couldn’t load <span className="ml-1 font-semibold">“{title}”</span>
      </div>
    );
  }

  const isInfinite =
    query &&
    typeof query === "object" &&
    "fetchNextPage" in query &&
    "data" in query;

  const wrapper = isInfinite
    ? query
    : {
        data: {
          pages: [
            Array.isArray(query.data) ? query.data : query.data?.results ?? [],
          ],
        },
        fetchNextPage: () => {},
        hasNextPage: false,
        isFetchingNextPage: false,
      };

  const movies = wrapper.data.pages.flatMap((p) => p.results ?? p);

  return (
    <div ref={ref}>
      <Section
        title={title}
        movies={movies}
        fetchNextPage={wrapper.fetchNextPage}
        hasNextPage={wrapper.hasNextPage}
        isFetchingNextPage={wrapper.isFetchingNextPage}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}
