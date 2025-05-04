/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const RegistrationContext = createContext(null);

export function RegistrationProvider({ children }) {
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
    genres: [],
    platforms: [],
    actors: [],
    plan: "",
  });
  function update(fields) {
    setData((prev) => ({ ...prev, ...fields }));
  }
  return (
    <RegistrationContext.Provider value={{ data, update }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrationContext() {
  const ctx = useContext(RegistrationContext);
  if (!ctx)
    throw new Error(
      "useRegistrationContext must be inside RegistrationProvider"
    );
  return ctx;
}

// alias for backwards‐compat
export function useRegistration() {
  return useRegistrationContext();
}
