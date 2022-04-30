import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../src/components/AuthContext";
import { supabase } from "../src/utils/supabaseClient";

function Dashboard() {
  const user = useAuth();
  const slugRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    if (user) {
      supabase
        .from("link")
        .select("*")
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [user]);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!user) return;
        const res = await supabase.from("link").insert({
          slug: slugRef.current?.value,
          url: urlRef.current?.value,
          user_id: user.id,
        });
        console.log(res);
      }}
    >
      <input ref={slugRef} type="text" placeholder="Slug" />
      <input ref={urlRef} type="text" placeholder="URL" />
      <button>Add</button>
    </form>
  );
}

export default Dashboard;
