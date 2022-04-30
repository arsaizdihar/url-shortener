import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const AuthContext = React.createContext<User | null>(null);

const protectedUrls = ["/dashboard"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    setUser(supabase.auth.user());
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      const user = supabase.auth.user();
      if (user === null && protectedUrls.includes(router.pathname)) {
        router.push("/login");
      }
      setUser(user);
    });
    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
