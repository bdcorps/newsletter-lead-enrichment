import {
  Box,
  Button,
  Container,
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

  // const email = "sunnyashiin@gmail.com";

  if (!results || results.length === 0) {
    return (
      <Layout>
        <Container maxW="container.md">
          <VStack h="full">
            <Input
              placeholder="sunnyashiin@gmail.com"
              onChange={(evt: any) => {
                setEmail(evt.target.value);
              }}
            />

            <Button
              colorScheme="brand"
              onClick={() => {
                axios.get(`/api/results?email=${email}`).then((res) => {
                  setResults(res.data.leads);
                });
              }}
            >
              Go
            </Button>
          </VStack>
        </Container>
      </Layout>
    );
  }

  // return <Text>{JSON.stringify(results)}</Text>;
  return (
    <Layout>
      <Container maxW="container.md" h="full">
        <CSVLink data={results}>
          <Button colorScheme="brand">Download as CSV</Button>
        </CSVLink>
        <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
          {results.map((result: any, i: number) => {
            return (
              <Box key={`res_${i}`}>
                <Text>{result.email}</Text>
                <Text>{result.bio}</Text>
              </Box>
            );
          })}
        </VStack>
      </Container>
    </Layout>
  );
};

export default Results;
