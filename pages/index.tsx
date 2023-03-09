import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  chakra,
  Container,
  Heading,
  HStack,
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
  const [emailTokens, setEmailTokens] = useState([]);
  const [results, setResults] = useState<any[]>([]);

  const [currentlyProcessing, setCurrentlyProcessing] = useState(1);

  const getSampleResults = async () => {
    axios
      .post("/api/notify", {
        notes: `asked for ${JSON.stringify(emailTokens)}`,
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
        })
        .catch((err) => {
          console.log(err);
        });

      setResults((prevResults: any[]) => [...prevResults, res.data]);
    }

    setLoading(false);
  };

  // if (loading) {
  //   return (
  //     <Center h="full">
  //       <VStack w="full">
  //         <Spinner />
  //         <Text>{`Processing ${currentlyProcessing}/${emailTokens.length}`}</Text>
  //       </VStack>
  //     </Center>
  //   );
  // }

  return (
    <>
      <HStack w="full">
        <VStack w="full" spacing={10}>
          <Box w="full">
            <Textarea
              h={200}
              key="email"
              placeholder="sunnyashiin@gmail.com, elon@tesla.com"
              defaultValue=""
              onChange={(evt: any) => {
                setEmailTokens(evt.target.value.split(","));
              }}
            />
          </Box>

          <Button
            onClick={() => {
              setResults([]);


              getSampleResults();
            }}
            rightIcon={<ArrowForwardIcon />}
            width="full"
            colorScheme="brand"
            isDisabled={emailTokens.length === 0}
          >
            Go
          </Button>

          {loading && (
            <VStack w="full">
              <Spinner />
              <Text>{`Processing ${currentlyProcessing}/${emailTokens.length}`}</Text>
            </VStack>
          )}

          {results && results.length > 0 && (
            <VStack align="flex-start" spacing={4}>
              <Text fontSize="lg" fontWeight={500}>
                Showing {`${results.length} of ${emailTokens.length}`} results
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
            </VStack>
          )}
        </VStack>
      </HStack>

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
      <Box
    
        py={10}
        h={"100vh"}
      >
        <Container maxW="container.lg">
          <Center p={4} h="full">
            <Stack>
              <VStack spacing={10}>
                <VStack spacing={4} textAlign="center" w="full" flex={1}>
                  <Heading>Email to Bio</Heading>
                  <Text color="gray.600">
                    Enter someone&apos;s email and we&apos;ll describe them for
                    you. Uses public data only. Uses ChatGPT API.
                  </Text>
                  <Demo />
                </VStack>
              </VStack>

              {/* {results && results.length > 0 && (
                <VStack align="flex-start" spacing={10}>
                  <Text fontSize="lg">
                    Showing {`${results.length} of ${emailTokens.length}`}{" "}
                    results
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
                </VStack>
              )} */}
            </Stack>
          </Center>
        </Container>
      </Box>
    </Layout>
  );
};

export default Order;
