import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../src/components/AuthContext";
import DashboardLayout from "../../src/layouts/DashboardLayout";
import { supabase } from "../../src/utils/supabaseClient";

function AddUrl() {
  const user = useAuth();
  const [errors, setErrors] = useState({
    slug: false,
    url: false,
  });
  const [slug, setSlug] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();
  const errorColor = useColorModeValue("red.400", "red.300");

  const checkSlugError = () => {
    const isError = !/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(slug);
    setErrors({
      ...errors,
      slug: isError,
    });
    return isError;
  };
  const checkUrlError = () => {
    const isError =
      !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
        url
      );
    setErrors({
      ...errors,
      url: isError,
    });
    return isError;
  };

  const [loading, setLoading] = useState(false);
  return (
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
      maxW="md"
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        if (checkSlugError() || checkUrlError()) return;
        if (!user) return;
        const res = await supabase
          .from("link")
          .insert({
            slug,
            url,
            user_id: user.id,
          })
          .then(() => router.push("/dashboard"));
      }}
    >
      <Link href="/dashboard" passHref legacyBehavior>
        <Button as="a" variant={"ghost"}>
          <ArrowBackIcon />
        </Button>
      </Link>
      <Heading fontSize="2xl">Add new link</Heading>
      <FormControl pt="4">
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <Input
          autoFocus
          isInvalid={errors.slug}
          type="text"
          id="slug"
          variant={"outline"}
          placeholder="Slug"
          focusBorderColor={useColorModeValue("purple.500", "purple.400")}
          value={slug}
          onBlur={checkSlugError}
          onChange={(e) => {
            setSlug(e.target.value);
          }}
        />
        {errors.slug && (
          <Text color={errorColor} fontSize={"sm"} pl={1} mt={0.5}>
            Invalid Slug
          </Text>
        )}
      </FormControl>
      <FormControl pb="4">
        <FormLabel htmlFor="url">URL</FormLabel>
        <Input
          isInvalid={errors.url}
          type="text"
          id="url"
          variant={"outline"}
          placeholder="URL"
          focusBorderColor={useColorModeValue("purple.500", "purple.400")}
          value={url}
          onBlur={checkUrlError}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        {errors.url && (
          <Text color={errorColor} fontSize={"sm"} pl={1} mt={0.5}>
            Invalid URL
          </Text>
        )}
      </FormControl>
      <Button type="submit" colorScheme={"purple"} w="full" disabled={loading}>
        Add
      </Button>
    </VStack>
  );
}

AddUrl.Layout = DashboardLayout;

export default AddUrl;
