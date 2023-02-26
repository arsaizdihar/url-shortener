import { GetServerSideProps } from "next";
import { supabase } from "../src/utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slugs = params?.slug as string[];
  const slug = slugs[0];
  const driveEndpoint = process.env.DRIVE_ENDPOINT;
  if (driveEndpoint && slug === "drive") {
    const driveUrl = `${driveEndpoint}/${slugs.slice(1).join("/")}`;
    return {
      redirect: {
        destination: driveUrl,
        permanent: process.env.NODE_ENV === "production",
      },
    };
  }
  if (slugs.length > 1) {
    return { notFound: true };
  }
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
