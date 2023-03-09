import "@fontsource/inter";

import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { FunctionComponent } from "react";
import { LandingHeader } from "./LandingHeader";

interface LayoutProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({
  children,
  backgroundColor = "white",
}: LayoutProps) => {
  return (
    <Box backgroundColor={backgroundColor} w="full" h="full">
      <NextSeo
        title="Email to Bio"
        description="Enter someone's email and we'll describe them for you. Uses public data only. Uses ChatGPT API."
        additionalLinkTags={[{ rel: "icon", href: "/logo.svg" }]}
      />
      <Box w="full" textAlign="center">
        <Box css={{ position: "absolute" }} w="full">
          <LandingHeader name="Readership" />
        </Box>
        {children}
        {/* <Footer name="Readership" /> */}
      </Box>
    </Box>
  );
};

export default Layout;
