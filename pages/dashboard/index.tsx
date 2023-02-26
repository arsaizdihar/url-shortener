import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import DashboardLayout from "../../src/layouts/DashboardLayout";
import { ILink } from "../../src/type";
import { supabase } from "../../src/utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const res = await supabase
    .from("link")
    .select("id, created_at, slug, url, views")
    .eq("user_id", user.id);
  return { props: { user, links: res.data || [] } };
};

function DashboardPage({ links }: { links: ILink[] }) {
  useEffect(() => {}, []);
  return (
    <>
      <Heading>Dashboard</Heading>
      <Box
        bgColor={useColorModeValue("gray.200", "gray.600")}
        w="full"
        maxW="container.md"
        p={4}
        rounded="md"
        shadow="sm"
        minH={200}
      >
        <Heading as="h2" size="md" fontWeight={"medium"}>
          Your links
        </Heading>
        <Stack mt={4} as="ul" spacing={4}>
          {links.map((link) => (
            <LinkItem key={link.id} {...link} />
          ))}
          <NextLink href="/dashboard/add" passHref legacyBehavior>
            <Button
              as="a"
              leftIcon={<PlusSquareIcon />}
              colorScheme="purple"
              variant="solid"
            >
              Add new link
            </Button>
          </NextLink>
        </Stack>
      </Box>
    </>
  );
}

function LinkItem(p: ILink) {
  const [copied, setCopied] = useState(false);
  return (
    <HStack
      justifyContent={"space-between"}
      as="li"
      p={2}
      rounded="sm"
      bgColor={useColorModeValue("gray.100", "gray.700")}
    >
      <Stack>
        <NextLink href={`/${p.slug}`} passHref legacyBehavior>
          <Link color={useColorModeValue("purple.500", "purple.300")}>
            link.arsaizdihar.com/{p.slug}
          </Link>
        </NextLink>
        <Text fontSize="sm" maxW="80">
          {p.url}
        </Text>
      </Stack>
      <VStack alignItems={"end"}>
        <Button
          size="sm"
          color={useColorModeValue("purple.400", "purple.200")}
          onClick={() =>
            navigator.clipboard
              .writeText(`https://link.arsaizdihar.com/${p.slug}`)
              .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              })
          }
          _focus={{ boxShadow: "none" }}
          leftIcon={
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>
          }
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Text
          display={"flex"}
          alignItems="center"
          gap="2"
          fontSize={"sm"}
          pr="4"
          color={useColorModeValue("gray.600", "gray.400")}
        >
          {p.views}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </Text>
      </VStack>
    </HStack>
  );
}

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
