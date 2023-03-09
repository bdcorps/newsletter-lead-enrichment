import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Link,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const navLinks = [
  { name: "Built by Sukh", link: "https://twitter.com/thisissukh_" },
];

const DesktopSidebarContents = ({ name }: any) => {
  const router = useRouter();
  return (
    <Container maxW={["full", "container.xl"]} p={0}>
      <Stack
        justify="space-between"
        p={[0, 4]}
        w="full"
        direction={["column", "row"]}
      >
        <Box display={{ base: "none", md: "flex" }}>
          <HStack spacing={4}>
            <Image src="/logo.svg" alt="Logo" w={8}></Image>
            {/* <Link fontSize="xl" href="/">
              {name}
            </Link> */}
          </HStack>
        </Box>
        <Spacer />
        <Stack
          align="flex-start"
          spacing={[4, 10]}
          direction={["column", "row"]}
        >
          {navLinks.map((navLink: any, i: number) => {
            return (
              <Link
                isExternal
                href={navLink.link}
                key={`navlink_${i}`}
                fontWeight={500}
                variant="ghost"
                fontSize={["lg", "md"]}
              >
                {navLink.name}
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};
const MobileSidebar = ({ name }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w="full" align="center">
        <HStack spacing={4}>
          <Image src="/logo.svg" alt="Logo" w={8}></Image>
          <Heading fontSize="xl">{name}</Heading>
        </HStack>
        <Spacer />
        <IconButton
          aria-label="Open Nav menu"
          colorScheme="white"
          variant="ghost"
          size="md"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton top={3.5} />
            <DrawerHeader fontSize={["xl", "md"]}>{name}</DrawerHeader>

            <DrawerBody>
              <DesktopSidebarContents />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  );
};

interface SidebarProps {
  name: string;
}

const Sidebar = ({ name }: SidebarProps) => {
  return (
    <chakra.header id="header">
      <Box display={{ base: "flex", md: "none" }} p={4}>
        <MobileSidebar name={name} />
      </Box>

      <Box display={{ base: "none", md: "flex" }}>
        <DesktopSidebarContents name={name} />
      </Box>
    </chakra.header>
  );
};

interface DrawerHomeProps {
  name: string;
}

export const LandingHeader = ({ name }: DrawerHomeProps) => {
  return (
    <Box w="full">
      <Sidebar name={name} />
    </Box>
  );
};
