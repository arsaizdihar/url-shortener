import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { ApiError, Provider, Session, User } from "@supabase/supabase-js";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../src/utils/supabaseClient";

function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const errorColor = useColorModeValue("red.400", "red.300");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  return (
    <Flex flexGrow={1} justifyContent="center" alignItems={"center"}>
      <VStack
        as="form"
        alignItems={"start"}
        bgColor={useColorModeValue("white", "gray.800")}
        rounded="md"
        p={6}
        shadow="lg"
        _hover={{ shadow: "xl" }}
        transition="all 0.3s ease-in-out"
        w="full"
        maxW="xs"
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          if (loading) return;
          if (
            !emailRef.current ||
            !/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
              emailRef.current.value
            )
          ) {
            emailRef.current?.focus();
            return setError(true);
          }
          setLoading(true);
          setError(false);
          const promise = new Promise<{
            session: Session | null;
            user: User | null;
            provider?: Provider | undefined;
            url?: string | null | undefined;
            error: ApiError | null;
          }>(async (resolve, reject) => {
            const data = await supabase.auth.signIn({
              email: emailRef.current!.value,
            });
            if (data.error) {
              reject(data.error);
            } else {
              resolve(data);
            }
          });
          toast.promise(promise, {
            loading: "Sending magic link...",
            success: "Check your email for the login link!",
            error: (error) => {
              setLoading(false);
              return error.error_description || error.message;
            },
          });
          await promise;
        }}
      >
        <Heading fontSize="2xl">LOGIN</Heading>
        <FormControl py="4">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            autoFocus
            ref={emailRef}
            type="email"
            id="email"
            variant={"filled"}
            placeholder="Email"
            isInvalid={error}
            focusBorderColor={useColorModeValue("purple.500", "purple.400")}
          />
          {error && (
            <Text color={errorColor} fontSize={"sm"} pl={1} mt={0.5}>
              Invalid Email
            </Text>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme={"purple"}
          w="full"
          disabled={loading}
        >
          Login
        </Button>
      </VStack>
    </Flex>
  );
}

export default Login;
