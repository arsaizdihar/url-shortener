import {
  ChakraProvider,
  extendTheme,
  Flex,
  theme as defaultTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../src/components/AuthContext";
import Footer from "../src/components/Footer";
import NavBar from "../src/components/NavBar";
import "../styles/globals.css";

const theme = extendTheme({
  fonts: {
    heading: `Inter, ${defaultTheme.fonts.heading}`,
    body: `Inter, ${defaultTheme.fonts.body}`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bgColor: mode("white", "black")(props),
      },
    }),
  },
});

function DefaultLayout({ children }: { children?: React.ReactNode }) {
  return children;
}

function MyApp({ Component, pageProps }: AppProps) {
  const isError = (Component as any).isError;
  const Layout = (Component as any).Layout || DefaultLayout;
  if (isError)
    return (
      <ChakraProvider>
        <Component {...pageProps} />;
      </ChakraProvider>
    );
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider value={pageProps.user}>
        <Head>
          <title>Shorten by Arsa</title>
        </Head>
        <Flex w="full" direction={"column"} minH="100vh">
          <NavBar />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer />
          <Toaster />
        </Flex>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
