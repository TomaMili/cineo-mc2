import { useState, useCallback } from "react";

function useSelectable(initial = []) {
  const [items, setItems] = useState(initial);

  const toggle = useCallback(
    (v) =>
      setItems((cur) =>
        cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]
      ),
    []
  );

  return [items, toggle];
}

export default useSelectable;
