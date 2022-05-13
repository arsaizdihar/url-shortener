import { HStack, Text } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <HStack justifyContent={"center"}>
      <Text color="gray" py="2" fontSize={"sm"}>
        © 2022 Arsa
      </Text>
    </HStack>
  );
}

export default Footer;
