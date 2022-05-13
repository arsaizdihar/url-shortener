import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

const AuthContext = React.createContext<User | null>(null);

const protectedUrls = ["/dashboard"];

async function handleAuthChange(
  event: AuthChangeEvent,
  session: Session | null
) {
  await fetch("/api/auth", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify({ event, session }),
  });
}

export function AuthProvider({
  children,
  value = null,
}: {
  children: React.ReactNode;
  value?: User | null;
}) {
  const [user, setUser] = useState<User | null>(value);
  const router = useRouter();
  useEffect(() => {
    setUser(supabase.auth.user());
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        const user = supabase.auth.user();
        if (user === null && protectedUrls.includes(router.pathname)) {
          router.push("/login");
        }
        setUser(user);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, [router]);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
