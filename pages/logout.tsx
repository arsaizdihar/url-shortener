import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { supabase } from "../src/utils/supabaseClient";

function Logout() {
  const router = useRouter();
  useEffect(() => {
    const promise = supabase.auth.signOut();
    toast.promise(
      promise,
      {
        error: "Error signing out",
        success: "Signed out successfully",
        loading: "Signing out...",
      },
      { id: "logout" }
    );
    promise.then(() => router.push("/login"));
  });
  return null;
}

export default Logout;
