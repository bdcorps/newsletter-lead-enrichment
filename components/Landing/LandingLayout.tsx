import "@fontsource/inter";

import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { FunctionComponent } from "react";
import Footer from "./LandingFooter";
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
        title="Readership"
        description="Enrich your newsletter subscriber data and learn more about your readers - where they are from, what they do, what they like, what they are interested in."
        additionalLinkTags={[{ rel: "icon", href: "/logo.svg" }]}
      />
      <Box w="full" textAlign="center">
        <Box css={{ position: "absolute" }} w="full">
          <LandingHeader name="Readership" />
        </Box>
        {children}
        <Footer name="Readership" />
      </Box>
    </Box>
  );
};

export default Layout;
