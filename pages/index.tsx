import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Heading,
  Input,
  shouldForwardProp,
  SimpleGrid,
  Spinner,
  Stack,
  StackDivider,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { isValidMotionProp, motion } from "framer-motion";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import Layout from "../components/Landing/LandingLayout";

const faqs = [
  {
    q: "What kind of insights can I expect?",
    a: "We pull out the most important information from the person's bio. This includes their job title, company, location, interests, and more.",
  },
  {
    q: "How do I get started?",
    a: "Copy/paste emails of your subscribers as a comma separated list, we will process and send you the results after a payment is made.",
  },
  {
    q: "How accurate are the results?",
    a: "This depends on the quality of public data available on the individual.If they don't have much, the results will be lofty. We're working on improving the accuracy soon.",
  },
  {
    q: "How does this work?",
    a: "We gather public data on an individual and summarize it using AI.",
  },
  {
    q: "Can I remove my email from this database?",
    a: "Ofcourse, send me an email at sukh[at]launchman.com and I'll make sure your email is not listed.",
  },

  {
    q: "I'm not happy with the results, can I get a refund?",
    a: "Yep, no problem. Let us know and we'll refund you at sukh[at]launchman.com",
  },
];

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

const FAQSection = ({ items }: any) => {
  return (
    <Box borderRadius="lg" w="full" p={4} textAlign="left">
      <SimpleGrid minChildWidth={[200, 300]} spacing={10}>
        {items.map((item: any, i: number) => {
          return (
            <VStack w="full" spacing={2} key={`faq_${i}`} align="flex-start">
              <Text fontWeight={600}>{item.q}</Text>
              <Text>{item.a}</Text>
            </VStack>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

interface DemoProps {}

const Demo: FunctionComponent<DemoProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [ownerEmail, setOwnerEmail] = useState("");
  const [emailTokens, setEmailTokens] = useState([]);
  const [results, setResults] = useState<any[]>([]);

  const [currentlyProcessing, setCurrentlyProcessing] = useState(1);

  const getSampleResults = async () => {
    axios
      .post("/api/notify", {
        notes: `${ownerEmail} asked for ${JSON.stringify(emailTokens)}`,
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(true);

    for (const [i, email] of Object.entries(emailTokens)) {
      const index: number = Number(i);
      setCurrentlyProcessing(index + 1);
      const res: any = await axios
        .post("/api/search", {
          email,
          ownerEmail,
        })
        .catch((err) => {
          console.log(err);
        });

      if (index < 3) {
        setResults((prevResults: any[]) => [...prevResults, res.data]);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <Center h="full">
        <VStack w="full">
          <Spinner />
          <Text>{`Processing ${currentlyProcessing}/${emailTokens.length}`}</Text>
        </VStack>
      </Center>
    );
  }

  if (results && results.length > 0) {
    return (
      <VStack align="flex-start" spacing={10}>
        <Text fontSize="2xl">
          Showing ({`${results.length} of ${emailTokens.length}`}) results
        </Text>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="flex-start"
        >
          {results.map((result: any, i: number) => {
            return (
              <Box key={`res_${i}`} textAlign="left">
                <Text fontWeight={500}>{result.email}</Text>
                <Text color="gray.600">{result.bio}</Text>
              </Box>
            );
          })}
        </VStack>

        {results.length > 0 && (
          <VStack
            w="full"
            rounded="lg"
            backgroundColor="gray.100"
            align="center"
            spacing={6}
            p={8}
            my={8}
          >
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight={700} textAlign="center">
                {`Unlock insights for all ${emailTokens.length} of your subscribers for $20`}
              </Text>
              <Text>
                Results will be emailed directly to your email address as a CSV
              </Text>
            </VStack>
            <Button
              colorScheme="brand"
              onClick={() => {
                window.open("https://buy.stripe.com/fZe7wi3yfgDMfqo9AR");
              }}
            >
              Pay with Stripe
            </Button>
          </VStack>
        )}
      </VStack>
    );
  }

  return (
    <>
      <VStack w="full" spacing={10}>
        <Box w="full">
          <Text textAlign="left" fontWeight={600}>
            Enter subscriber email addresses (Separated by commas)
          </Text>
          <Textarea
            h={200}
            key="email"
            placeholder="sunny@gmail.com, elon@tesla.com"
            defaultValue=""
            onChange={(evt: any) => {
              setEmailTokens(evt.target.value.split(","));
            }}
          />
        </Box>

        <Box w="full">
          <Text textAlign="left" fontWeight={600}>
            Enter your real email
          </Text>

          <Input
            placeholder="myemail@gmail.com"
            type="email"
            onChange={(evt: any) => {
              setOwnerEmail(evt.target.value);
            }}
          ></Input>
        </Box>
        <Button
          onClick={() => {
            getSampleResults();
          }}
          rightIcon={<ArrowForwardIcon />}
          width="full"
          colorScheme="brand"
          isDisabled={emailTokens.length === 0 || !ownerEmail}
        >
          Go
        </Button>
      </VStack>
      {/* <Text>{emailTokens}</Text> */}
      {/* <HStack w="full">
  <Badge onClick={() => {}} cursor="pointer">
    sunnyashiin@gmail.com
  </Badge>
  <Badge onClick={() => {}} cursor="pointer">
    sunnyashiin@gmail.com
  </Badge>
</HStack> */}
    </>
  );
};

const Order = () => {
  const heroResults = [
    {
      email: "sukhxxx@gmail.com",
      bio: "Sukh is an experienced software engineer and freelance consultant. With a passion for coding, she specializes in building and maintaining software products. She is experienced in SaaS development and regularly contributes to open-source projects. She is knowledgeable in SMTP authentication, and is familiar with code review processes. Sunnyashiin is also well-versed in AI-driven technologies and has created a FB Ad Generator using AI.",
    },
    {
      email: "sunilxxx@plainenglish.io",
      bio: "Sunil Sandhu is the founder and CEO of PlainEnglish.io, a company focused on helping people become better writers and content creators. He is an expert in programming and web scraping, and is a well-known figure on social media. Sunil is passionate about creating content that is both informative and entertaining. He is active on Twitter, LinkedIn, and Medium, and his writing has been featured in top publications such as Livecycle, Bright Data, and Venture. Sunil is also a member of the Writer's Community, a Discord group he founded to bring together like-minded writers. Sunil's commitment to helping others become better writers is evident in his work and his passion for the craft. He is sure to be a leader in the industry for years to come.",
    },
  ];

  const router = useRouter();
  return (
    <Layout>
      <Box backgroundImage="url('/bg.jpg')" backgroundPosition="right" p={100}>
        <Container maxW="container.lg" minH={"80vh"}>
          <Center p={4} h="full">
            <Stack spacing={10} direction={["column", "row"]}>
              <VStack spacing={4} textAlign="center" w="full" flex={1}>
                <Heading>Learn who is reading your newsletters</Heading>
                <Text color="gray.600">
                  Enrich your subscriber data and learn more about your readers
                  - where they are from, what they do, what they like, what they
                  are interested in.
                </Text>

                <Button
                  colorScheme="brand"
                  w="full"
                  onClick={() => {
                    router.push("#try-it-out");
                  }}
                >
                  Get started for $20 (100 emails)
                </Button>
              </VStack>

              <VStack w="full" flex={1}>
                <VStack overflow="scroll" w="full" h="full" spacing={6}>
                  {heroResults.map((result: any, i: number) => {
                    return (
                      <ChakraBox
                        key={`res_${i}`}
                        initial={{ x: 0, opacity: 0 }}
                        animate={{
                          opacity: [0, 1],
                        }}
                        // @ts-ignore no problem in operation, although type error appears.
                        transition={{
                          duration: 0.8,
                        }}
                      >
                        <Box
                          key={`hero_${i}`}
                          p={3}
                          backgroundColor="brand.100"
                          rounded="md"
                          boxShadow="base"
                          color="brand.500"
                        >
                          <Text textAlign="left" fontWeight={500}>
                            {result.email}
                          </Text>
                          <Text
                            textAlign="left"
                            // color="gray.600"
                            fontSize="sm"
                            noOfLines={4}
                          >
                            {result.bio}
                          </Text>
                        </Box>
                      </ChakraBox>
                    );
                  })}
                </VStack>
              </VStack>
            </Stack>
          </Center>
        </Container>
      </Box>

      <Container maxW="container.lg" id="try-it-out">
        <Box p={[4, 10]}>
          <VStack spacing={6}>
            <Heading as="h2">Try it out (Free for first 3)</Heading>
            <Demo />
          </VStack>
        </Box>

        <VStack py={10}>
          <Container maxW="container.lg" w="full" mt={[16, 24]}>
            <VStack spacing={10}>
              <Box textAlign="center">
                <Heading as="h2" fontWeight={500} fontSize="4xl">
                  Frequently Asked Questions
                </Heading>
              </Box>

              <FAQSection items={faqs} />
            </VStack>
          </Container>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Order;
