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
  const qc = useQueryClient(); // no setters needed
  const mutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut().catch(() => {}); // ignore 403
      await apiLogout().catch(() => {});
    },
    onSettled: () => {
      // runs on success OR error
      qc.clear(); // blow away every cache entry
      toast.success("Signed out");
      navigate("/", { replace: true });
    },
  });
  return { logout: mutation.mutate, isLoading: mutation.isLoading };
}
