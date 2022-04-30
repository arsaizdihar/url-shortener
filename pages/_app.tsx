import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../src/components/AuthContext";
import NavBar from "../src/components/NavBar";
import "../styles/globals.css";
function MyApp({ Component, pageProps }: AppProps) {
  const isError = (Component as any).isError;
  if (isError)
    return (
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    );
  return (
    <div className="relative bg-white dark:bg-black overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <ThemeProvider attribute="class">
          <AuthProvider>
            <NavBar />
            <Component {...pageProps} />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default MyApp;
