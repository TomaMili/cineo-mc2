/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import SuperSuggestionPopup from "../features/supersuggestion/SuperSuggestionPopup";

const Ctx = createContext(null);

export function SuperSuggestProvider({ children }) {
  const [open, setOpen] = useState(false);

  const show = useCallback(() => setOpen(true), []);
  const hide = useCallback(() => setOpen(false), []);

  return (
    <Ctx.Provider value={{ show, hide }}>
      {children}
      {open && <SuperSuggestionPopup onClose={hide} />}
    </Ctx.Provider>
  );
}

export function useSuperSuggest() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useSuperSuggest must be inside <SuperSuggestProvider>");
  return ctx;
}
