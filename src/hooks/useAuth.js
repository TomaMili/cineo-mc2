// import { createContext, useContext, useState, useEffect } from "react";
// import supabase from "./supabaseClient";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const session = supabase.auth.getSession();
//     setUser(session?.user ?? null);

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);
// export default useAuth;
