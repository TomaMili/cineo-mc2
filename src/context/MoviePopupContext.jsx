import { createContext, useContext, useState, useCallback } from "react";
import MoviePopup from "../ui/MoviePopup";

const PopupCtx = createContext(null);

export function MoviePopupProvider({ children }) {
  const [movie, setMovie] = useState(null);

  const open = useCallback((m) => setMovie(m), []);
  const close = useCallback(() => setMovie(null), []);

  return (
    <PopupCtx.Provider value={{ open, close }}>
      {children}
      <MoviePopup movie={movie} onClose={close} />
    </PopupCtx.Provider>
  );
}

export function useMoviePopup() {
  const ctx = useContext(PopupCtx);
  if (!ctx)
    throw new Error("useMoviePopup must be used inside <MoviePopupProvider>");
  return ctx;
}
