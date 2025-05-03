import { useState, useEffect } from "react";
import supabase from "../services/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1) on mount, get current session
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
      })
      .catch((err) => {
        console.error("Error fetching session:", err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });

    // 2) subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // cleanup subscription on unmount
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
