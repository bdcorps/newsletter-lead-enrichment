import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Heading,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const Order = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [snippets, setSnippets] = useState({});
  const [results, setResults] = useState("");

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleDescribeLead = async () => {
    if (!email) {
      alert("No email provided");
      return;
    }
    setLoading(true);

    // https://api.serpdog.io/search?api_key=APIKEY&q=coffee&gl=us

    const serpRes = await axios.get(
      `https://api.serpdog.io/search?api_key=${process.env.NEXT_PUBLIC_SERPDOG_API_KEY}&q=${email}&gl=us`
    );
    const serpData = serpRes.data;

    const serpData1 = {
      meta: {
        api_key: "63f90884c9cdb956e2f4ba98",
        q: "surjithctly@gmail.com",
        gl: "US",
        country: "US",
        num: "20",
        page: "0",
      },
      twitter_results: {
        tweets: [
          {
            snippet:
              "I'm curating everything into a Notion Guide. \nComing Soon 👀 pic.twitter.com/S73Mx5D…",
            publishing_date: "",
          },
        ],
      },
      organic_results: [
        {
          title: "surjithctly's profile on ThemeForest",
          link: "https://themeforest.net/user/surjithctly",
          displayed_link: "",
          snippet:
            "My name is Surjith, also known as surjithctly, An Elite Website Template Designer on ... You can send donations via Paypal : surjithctly{at}gmail{dot}com.",
          images: [
            "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
          ],
          rank: 1,
        },
        {
          title: "Surjith's Blog",
          link: "https://blog.surjithctly.in/",
          displayed_link: "",
          snippet:
            "In this article, I will explain how you can create a static website with NEAT Stack and setup CMS to edit the content. What is NEAT Stack?",
          inline_sitelinks: [
            {
              title: "Contact",
              link: "https://blog.surjithctly.in/contact",
            },
            {
              title: "Badges",
              link: "https://blog.surjithctly.in/badges",
            },
            {
              title: "Newsletter",
              link: "https://blog.surjithctly.in/newsletter",
            },
          ],
          rank: 2,
        },
        {
          title: "Surjith S M",
          link: "https://dev.to/surjithctly",
          displayed_link: "",
          snippet:
            "Freelance Web & UX Designer from Incredible India. I design and develop creative websites, landing pages and application.",
          rank: 3,
        },
        {
          title: "Work Experience",
          link: "https://www.behance.net/surjithctly/resume",
          displayed_link: "",
          snippet:
            "surjithctly@gmail.com www.surjithctly.in. Over 6 years experience in designing outstanding web-based products for consumer-oriented websites.",
          rank: 4,
        },
        {
          title: "Designers who work with Pagewiz",
          link: "https://m.facebook.com/notes/pagewiz-landing-pages-conversion-rate-optimization/designers-who-work-with-pagewiz/694202044029610/",
          displayed_link: "",
          snippet:
            "Facebook Page: https://www.facebook.com/slidehack. Surjith S M. Website: http://themeforest.net/user/surjithctly/portfolio. e-mail: surjithctly@gmail.com.",
          rank: 5,
        },
        {
          title: "Welcome to Web3Canvas - Web3Canvas",
          link: "https://web3canvas.com/welcome-to-web3canvas/",
          displayed_link: "",
          snippet:
            "He is passionate to learn new stuffs and like reading tech blogs and articles. More about Surjith SM. Website: www.surjithctly.in Email: surjithctly@gmail.com ...",
          rank: 6,
        },
        {
          title: "documentation-html-template/index.html at master",
          link: "https://github.com/surjithctly/documentation-html-template/blob/master/index.html",
          displayed_link: "",
          snippet:
            "... at master · surjithctly/documentation-html-template. ... page</strong></a> or ask question <a href=mailto:yourusername@gmail.com>@yourusername</a></p>.",
          rank: 7,
        },
        {
          title: "Better Envato - Chrome Extension for Envato Authors",
          link: "https://forums.envato.com/t/better-envato-chrome-extension-for-envato-authors/4711",
          displayed_link: "",
          snippet:
            "surjithctly September 5, 2015, 11:37am #1. Originally Published on Old Forums and Envato Market ... Buy me a Coffee via Paypal (surjithctly[at]gmail.com).",
          rank: 8,
        },
        {
          title: "Spooky - Halloween Email Template",
          link: "https://creativemarket.com/surjithctly/13223-Spooky-Halloween-Email-Template",
          displayed_link: "",
          snippet:
            "Gmail. Thunderbird. Hotmail. Yahoo Mail. Microsoft Outlook. iPhone. iPod. iPad. windows phone 7.5 android 4.0 Eudora. FoxMail. OperaMail.",
          rank: 9,
        },
        {
          title: "Home – Email Registration - Salvation Army Golf Classic",
          link: "https://salvationarmygolftoronto.com/home-email-registration/",
          displayed_link: "",
          snippet:
            "... organizer=”CTHthemes” organizer_email=”cththemes@gmail.com”]Gather is a ... statuslink=”https://twitter.com/surjithctly/status/616931074489200641″] ...",
          rank: 10,
        },
        {
          title:
            'Google (gmail) no longer allowing third party apps" access ...',
          link: "https://www.reddit.com/r/Hikvision/comments/v8b7i8/google_gmail_no_longer_allowing_third_party_apps/",
          displayed_link: "",
          snippet: "Jun 9, 2022 — Jun 9, 2022",
          rank: 11,
        },
        {
          title: "DATA SCIENCE - Trends, Skillset & Opportunities",
          link: "https://www.primeclasses.in/event/datascience",
          displayed_link: "",
          snippet:
            "team.primeclasses@gmail.com 9573274900. BE PART OF AI REVOLUTION. JOIN THE EVENT. RESERVE MY SEAT. Copyright © 2018. All rights reserved. Made in India.",
          rank: 12,
        },
        {
          title: "ABHISHEK (@__mr___aj__) • Instagram photos and videos",
          link: "https://www.instagram.com/__mr___aj__/?hl=en",
          displayed_link: "",
          snippet:
            "“Se realista, exije lo imposible _ Che Leftist Photography, Based in Kerala , India Contact info : abhishekvjacob@gmail.com. 's profile picture.",
          rank: 13,
        },
        {
          title: "Home - Email Registration",
          link: "https://africamoneydefisummit.com/home-email-registration/",
          displayed_link: "",
          snippet:
            "@surjithctly. ·. Follow. Gather #event #template. If you are searching for an amazing event template, Choose #Gather. Worth it.",
          rank: 14,
        },
        {
          title: "Home - Youtube Video Background - Bled Water Festival",
          link: "https://bledwf.com/home-youtube-video-background/",
          displayed_link: "",
          snippet:
            "@surjithctly. ·. Follow. Gather #event #template. If you are searching for an amazing event template, Choose #Gather. Worth it. 4:26 AM · Jul 3, 2015.",
          rank: 15,
        },
        {
          title: "Home - Tantrums and Tiaras: Battle of the Bar Queens",
          link: "https://tantrumstiaras.org/home-slider/",
          displayed_link: "",
          snippet:
            "@surjithctly. ·. Follow. Gather #event #template. If you are searching for an amazing event template, Choose #Gather. Worth it.",
          rank: 16,
        },
        {
          title: "Home – Eventbrite Integration – Georgiana Vasilescu",
          link: "https://georgianavasilescu.com/home-eventbrite-integration/",
          displayed_link: "",
          snippet:
            "... organizer=”CTHthemes” organizer_email=”cththemes@gmail.com”]Gather is a ... statuslink=”https://twitter.com/surjithctly/status/616931074489200641″][/ ...",
          rank: 17,
        },
        {
          title: "336551 - Application Tab on DevTools - Missing search ...",
          link: "https://bugs.chromium.org/p/chromium/issues/detail?id=336551",
          displayed_link: "",
          snippet:
            "gmail.com. on Wed, Jan 29, 2014, 1:16 AM PST. > If it doesn't meet your expectations. I thought that Resource tab exists only to help user make overview ...",
          rank: 18,
        },
      ],
      pagination: {
        page_no: {},
      },
      serpdog_pagination: {
        page_no: {},
      },
    };

    const allSnippets = serpData.organic_results
      .map((result: any) => {
        return result.snippet;
      })
      .join(". ");

    setSnippets(allSnippets);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      prompt: `This is the search history of "${email}". Can you describe this person? Only answer if there is a cohesive theme across the results. Add a confidence value at the end of the answer. "${allSnippets}"`,
    });

    setResults(completion.data.choices[0].text || "No results");
    setLoading(false);
  };

  return (
    <Center h="100vh" p={4}>
      <VStack spacing={4} w={500} align="left">
        <Heading>Newsletter Lead Enrichment</Heading>
        <Text color="gray.500">Know who is reading your newsletter</Text>

        <Input
          key="email"
          placeholder="Enter an email address"
          defaultValue={email}
          onChange={(evt) => {
            setEmail(evt.target.value);
          }}
        />

        {loading ? <Spinner /> : <Text>{results}</Text>}

        {/* <DisplayValue label="Indica (x1)" value="11" />
          <Divider />
          <DisplayValue label="Sales Tax" value="0.19" /> */}
        <Button onClick={handleDescribeLead} rightIcon={<ArrowForwardIcon />}>
          Go
        </Button>
        <Text color="gray.500" textAlign="center">
          Results are not stored
        </Text>

        <Link href="https://twitter.com/thisissukh_" textAlign="center">
          Built by Sukh
        </Link>
      </VStack>
    </Center>
  );
};

export default Order;
