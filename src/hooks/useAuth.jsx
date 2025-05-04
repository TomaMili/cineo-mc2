/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import {
  signUpWithProfile,
  login as apiLogin,
  logout as apiLogout,
} from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthSessionMissingError } from "@supabase/supabase-js";

const AuthContext = createContext({ authUser: null, profile: null });

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // 1) On mount, load session & subscribe
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthUser(data.session?.user || null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || null);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  // 2) A reusable fetchProfile function
  const refreshProfile = useCallback(async () => {
    if (!authUser?.id) {
      setProfile(null);
      return;
    }
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("profile_id", authUser.id)
      .single();
    if (error) {
      console.error("Failed to load profile:", error);
      setProfile(null);
    } else {
      setProfile(data);
    }
  }, [authUser]);

  // 3) Run it once whenever authUser changes
  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return (
    <AuthContext.Provider value={{ authUser, profile, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(AuthContext);
}

export function useSignUp() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (creds) => signUpWithProfile(creds),
    onSuccess: () => qc.invalidateQueries(["current-user"]),
  });
  return {
    signUp: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: () => {
      qc.invalidateQueries(["current-user"]);
      navigate("/homepage", { replace: true });
    },
  });
  return {
    login: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { setAuthUser, setProfile } = useCurrentUser(); // assume you expose setters

  const mutation = useMutation({
    mutationFn: async () => {
      // 1) Try to sign out of Supabase, but ignore if there's no session
      try {
        const { error } = await supabase.auth.signOut();
        if (error && !(error instanceof AuthSessionMissingError)) {
          throw error;
        }
      } catch (e) {
        if (!(e instanceof AuthSessionMissingError)) {
          throw e;
        }
      }

      // 2) Call your own backend logout if needed
      await apiLogout();
    },
    onSuccess: () => {
      // 3) Clear any React-Query caches for user data
      qc.removeQueries(["current-user"]);
      qc.removeQueries(["user"]); // whichever keys you use

      // 4) Clear your AuthContext
      setAuthUser(null);
      setProfile(null);

      toast.success("Signed out successfully");
      navigate("/landing-page", { replace: true });
    },
    onError: (err) => {
      console.error("Logout error", err);
      // still clear local state & redirect
      setAuthUser(null);
      setProfile(null);
      qc.removeQueries();
      toast.error("Error signing out—redirecting anyway");
      navigate("/landing-page", { replace: true });
    },
  });

  return {
    logout: () => mutation.mutate(),
    isLoading: mutation.isLoading,
  };
}
