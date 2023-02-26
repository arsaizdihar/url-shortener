/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import { useAuth } from "../src/components/AuthContext";

const Home: NextPage = () => {
  const user = useAuth();
  const color = useColorModeValue("purple.500", "purple.400");
  return (
    <Container
      as="main"
      maxW="7xl"
      display={"flex"}
      flexDirection="column"
      alignItems="center"
      flexGrow={1}
      px={{ base: 4, sm: 6, lg: 8 }}
      justifyContent="center"
    >
      <Heading fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}>
        Shorten your{" "}
        <Text as="span" color={color}>
          URL
        </Text>
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")} fontSize="large">
        Every long urls deserve a short one.
      </Text>
      <Box pt="6">
        <Link href={user ? "/dashboard" : "/login"} passHref legacyBehavior>
          <Button as="a" colorScheme={"purple"} size="lg">
            Get started
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
