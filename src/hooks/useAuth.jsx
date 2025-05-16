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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthUser(data.session?.user || null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || null);
        setLoading(false);
      }
    );
    return () => listener.subscription.unsubscribe();
  }, []);

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

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  return (
    <AuthContext.Provider
      value={{ authUser, profile, refreshProfile, loading }}
    >
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
  const { setAuthUser, setProfile } = useCurrentUser();
  const mutation = useMutation({
    mutationFn: async () => {
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

      await apiLogout();
    },
    onSuccess: () => {
      qc.removeQueries(["current-user"]);
      qc.removeQueries(["user"]);
      setAuthUser(null);
      setProfile(null);

      toast.success("Signed out successfully");
      navigate("/landing-page", { replace: true });
    },
    onError: (err) => {
      console.error("Logout error", err);
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
