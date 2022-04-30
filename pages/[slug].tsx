import { GetServerSideProps } from "next";
import { supabase } from "../src/utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const res = await supabase
    .from("link")
    .select("url")
    .eq("slug", slug)
    .single();
  if (!res.data) {
    return { notFound: true };
  }
  return {
    redirect: {
      destination: res.data.url,
      permanent: false,
    },
  };
};

export default function Page() {
  return <></>;
}
