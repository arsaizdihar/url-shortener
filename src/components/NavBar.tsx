/* eslint-disable @next/next/no-img-element */
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useAuth } from "./AuthContext";

function NavBar() {
  const user = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigation = [
    { name: "Log in", href: "/login", hidden: user !== null },
    { name: "Dashboard", href: "/dashboard", hidden: user === null },
    { name: "Log out", href: "/logout", hidden: user === null },
  ];
  return (
    <HStack
      bgColor={useColorModeValue("gray.50", "gray.900")}
      justifyContent="center"
    >
      <HStack
        position={"relative"}
        zIndex={10}
        py={8}
        maxW="container.xl"
        w="full"
        as={"nav"}
        justifyContent="space-between"
        h={{ base: "auto", sm: "10" }}
        px={{ base: 4, sm: 6, lg: 8 }}
      >
        <HStack spacing={{ base: 2, md: 4 }}>
          <NextLink href="/" passHref legacyBehavior>
            <Text
              as="a"
              fontFamily={"mono"}
              fontWeight="bold"
              fontSize={"xl"}
              mr={{ base: 8, md: 6 }}
              letterSpacing="widest"
            >
              Shorten
            </Text>
          </NextLink>
          {navigation.map((item) => (
            <NextLink href={item.href} key={item.href} passHref legacyBehavior>
              <Text as="a" hidden={item.hidden} fontWeight="medium">
                {item.name}
              </Text>
            </NextLink>
          ))}
        </HStack>
        <Button onClick={toggleColorMode} colorScheme="gray">
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </HStack>
    </HStack>
  );
}

export default NavBar;
