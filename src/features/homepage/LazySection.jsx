import { useInView } from "react-intersection-observer";
import Section from "./Section";

export default function LazySection({ title, fetchHook, ...props }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  // only call the hook once visible
  const sectionQuery = inView ? fetchHook() : { data: [], isLoading: false };

  return (
    <div ref={ref} className="h-full">
      <Section title={title} movies={sectionQuery} {...props} />
    </div>
  );
}
