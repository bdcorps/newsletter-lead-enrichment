import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PlausibleProvider from "next-plausible";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import "@fontsource/inter";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      brand: {
        "50": "#f2faef",
        "100": "#c9e9be",
        "200": "#98d582",
        "300": "#57bb33",
        "400": "#2fab02",
        "500": "#289002",
        "600": "#217a01",
        "700": "#1b6201",
        "800": "#175301",
        "900": "#103c01",
      },
    },
    fonts: {
      heading: `'Inter', sans-serif`,
      body: `'Inter', sans-serif`,
    },
  });

  return (
    <PlausibleProvider domain="readership.cc">
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
