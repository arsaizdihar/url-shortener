import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useAuth } from "../../src/components/AuthContext";
import DashboardLayout from "../../src/layouts/DashboardLayout";
import { supabase } from "../../src/utils/supabaseClient";

function AddUrl() {
  const user = useAuth();
  const slugRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!user) return;
        const res = await supabase
          .from("link")
          .insert({
            slug: slugRef.current?.value,
            url: urlRef.current?.value,
            user_id: user.id,
          })
          .then(() => router.push("/dashboard"));
      }}
    >
      <input ref={slugRef} type="text" placeholder="Slug" />
      <input ref={urlRef} type="text" placeholder="URL" />
      <button>Add</button>
    </form>
  );
}

AddUrl.Layout = DashboardLayout;

export default AddUrl;
