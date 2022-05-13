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
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import React, { useEffect } from "react";
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
  const res = await supabase.from("link").select("*").eq("user_id", user.id);
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
          <NextLink href="/dashboard/add" passHref>
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
  return (
    <HStack
      justifyContent={"space-between"}
      as="li"
      p={2}
      rounded="sm"
      bgColor={useColorModeValue("gray.100", "gray.700")}
    >
      <Stack>
        <NextLink href={`/${p.slug}`} passHref>
          <Link color={useColorModeValue("purple.500", "purple.300")}>
            link.arsaizdihar.com/{p.slug}
          </Link>
        </NextLink>
        <Text fontSize="sm" maxW="80">
          {p.url}
        </Text>
      </Stack>
    </HStack>
  );
}

DashboardPage.Layout = DashboardLayout;

export default DashboardPage;
