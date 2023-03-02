import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Heading,
  HStack,
  Input,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FunctionComponent, useState } from "react";
import { CSVLink } from "react-csv";
import Layout from "../components/Landing/LandingLayout";

interface ResultsProps {}

const Results: FunctionComponent<ResultsProps> = () => {
  const [results, setResults] = useState([]);
  const [email, setEmail] = useState("");
  const [showEmails, setShowEmails] = useState(true);

  // const email = "sunnyashiin@gmail.com";

  return (
    <Layout>
      <Center h="80vh">
        <Container maxW="container.md">
          <VStack w="full" align="flex-start" spacing={6}>
            <Heading>Get your results</Heading>

            {!results || results.length === 0 ? (
              <>
                <Input
                  placeholder="sunnyashiin@gmail.com"
                  onChange={(evt: any) => {
                    setEmail(evt.target.value);
                  }}
                />

                <Button
                  colorScheme="brand"
                  w="full"
                  onClick={() => {
                    axios.get(`/api/results?email=${email}`).then((res) => {
                      setResults(res.data.leads);
                    });
                  }}
                >
                  Go
                </Button>
              </>
            ) : (
              <>
                <HStack justify="space-between" w="full">
                  <CSVLink data={results}>
                    <Button colorScheme="brand" size="sm">
                      Download as CSV
                    </Button>
                  </CSVLink>
                  <Checkbox
                    isChecked={showEmails}
                    onChange={(evt: any) => {
                      setShowEmails(evt.target.checked);
                    }}
                  >
                    Show emails
                  </Checkbox>
                </HStack>

                <VStack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  h={400}
                  overflow="scroll"
                >
                  {results.map((result: any, i: number) => {
                    return (
                      <Box key={`res_${i}`} textAlign="left">
                        {showEmails ? (
                          <Text fontWeight={500}>{result.email}</Text>
                        ) : (
                          <Text fontWeight={500}>xxx@email.com</Text>
                        )}
                        <Text color="gray.600">{result.bio}</Text>
                      </Box>
                    );
                  })}
                </VStack>
              </>
            )}
          </VStack>
        </Container>
      </Center>
    </Layout>
  );

  // return <Text>{JSON.stringify(results)}</Text>;
  // return (
  //   <Layout>

  //       <CSVLink data={results}>
  //         <Button colorScheme="brand">Download as CSV</Button>
  //       </CSVLink>
  //       <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
  //         {results.map((result: any, i: number) => {
  //           return (
  //             <Box key={`res_${i}`}>
  //               <Text>{result.email}</Text>
  //               <Text>{result.bio}</Text>
  //             </Box>
  //           );
  //         })}
  //       </VStack>

  //   </Layout>
  // );
};

export default Results;
