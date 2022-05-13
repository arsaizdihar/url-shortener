import { VStack } from "@chakra-ui/react";
import React from "react";

function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <VStack
      flexGrow={1}
      justifyContent="center"
      maxW="container.xl"
      mx="auto"
      w="full"
    >
      {children}
    </VStack>
  );
}

export default DashboardLayout;
