import { GetServerSideProps } from "next";
import { supabase } from "../src/utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const [res1, { data, error }] = await Promise.all([
    supabase.from("link").select("url").eq("slug", slug).single(),
    supabase.rpc("increment_view_link", { link_slug: slug }),
  ]);
  if (!res1.data) {
    return { notFound: true };
  }
  return {
    redirect: {
      destination: res1.data.url,
      permanent: process.env.NODE_ENV === "production",
    },
  };
};

export default function Page() {
  return <></>;
}
