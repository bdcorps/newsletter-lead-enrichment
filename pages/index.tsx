import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  StackDivider,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
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
    q: "How do you collect the data?",
    a: "It's all public data on the person that we collect using their email address.",
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
  const [snippets, setSnippets] = useState({});
  const [results, setResults] = useState([]);

  const [step, setStep] = useState(0);

  const getSampleResults = async () => {
    setLoading(true);

    const sampleResults = await axios.post("/api/search", {
      emails: emailTokens,
      ownerEmail,
    });

    setResults(sampleResults.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    );
  }

  if (results && results.length > 0) {
    return (
      <VStack align="flex-start" spacing={10}>
        <Text fontSize="2xl">
          Total Results ({`${results.length}/${emailTokens.length}`})
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
                {`Unlock insights for all ${results.length} of your subscribers for $20`}
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
            placeholder="sunnyashiin@gmail.com, sukh@launchman.com"
            defaultValue=""
            onChange={(evt: any) => {
              setEmailTokens(evt.target.value.split(","));
            }}
          />
        </Box>

        <Box w="full">
          <Text textAlign="left" fontWeight={600}>
            Enter email to send results to (Should be ready in ~4 mins)
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
            setStep(1);
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
  return (
    <Layout>
      <Box
        backgroundImage="url('/bg.jpg')"
        minH="80vh"
        backgroundPosition="right"
      >
        <Container maxW="container.lg" h="80vh">
          <Center p={4} h="full">
            <VStack spacing={4} w={500} textAlign="center">
              <Heading>Learn who is reading your newsletters</Heading>
              <Text color="gray.600">
                Enrich your subscriber data and learn more about your readers -
                where they are from, what they do, what they like, what they are
                interested in.
              </Text>

              <Button
                colorScheme="brand"
                w="full"
                onClick={() => {
                  window.open("https://buy.stripe.com/fZe7wi3yfgDMfqo9AR");
                }}
              >
                Get started for $20 (100 emails)
              </Button>

              {/* <Text>
            Know the composition of the readers. Something like - 10% are
            Software Eng, 20% are artists etc.
          </Text>
          <Text>
            To personally reach out to subscribers that are a bit more VIP (i.e.
            if Ryan Hoover subscribes you prob wanna reach out).
          </Text> */}
            </VStack>
          </Center>
        </Container>
      </Box>

      <Container maxW="container.lg">
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
