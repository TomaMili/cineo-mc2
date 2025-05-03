/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../services/supabase";
import {
  signUpWithProfile,
  login as apiLogin,
  logout as apiLogout,
} from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext({ authUser: null, profile: null });

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);

  // 1a) on mount, get the session & auth user
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 1b) whenever authUser changes, fetch the corresponding public.users row
  useEffect(() => {
    if (!authUser?.id) {
      setProfile(null);
      return;
    }
    supabase
      .from("users")
      .select("*")
      .eq("profile_id", authUser.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load public.users row:", error);
          setProfile(null);
        } else {
          setProfile(data);
        }
      });
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, profile }}>
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
  const mutation = useMutation({
    mutationFn: () => apiLogout(),
    onSuccess: () => {
      qc.invalidateQueries(["current-user"]);
      navigate("/landing-page", { replace: true });
    },
  });
  return {
    logout: mutation.mutate,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
