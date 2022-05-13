import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/components/AuthContext";
import DashboardLayout from "../../src/layouts/DashboardLayout";
import { ILink } from "../../src/type";
import { supabase } from "../../src/utils/supabaseClient";

function DashboardPage() {
  const user = useAuth();
  const [links, setLinks] = useState<Array<ILink>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      supabase
        .from("link")
        .select("*")
        .eq("user_id", user.id)
        .then((res) => {
          setLinks(res.data || []);
          setIsLoading(false);
        });
    }
  }, [user]);

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
        {isLoading ? (
          <Stack mt={4}>
            <Skeleton height={8} width="80%" />
            <Skeleton height={8} />
            <Skeleton height={8} width="65%" />
          </Stack>
        ) : (
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
        )}
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
