import { useEffect, useRef } from "react";

export default function useDebounce(fn, ms, deps) {
  const timeout = useRef();

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(fn, ms);
    return () => clearTimeout(timeout.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
