import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import prisma from '../../lib/prisma';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {

  const results = []

  if (req.method === 'POST') {
    const { emails } = req.body

    const ownerEmail = String(req.body.ownerEmail)

    const upsertUser = await prisma.user.upsert({
      where: {
        email: ownerEmail,
      },
      update: {},
      create: {
        email: ownerEmail
      },
    })

    for (const email of emails) {
      const serpData = await getSerpDataForEmail(email);
      const bio = await generateOpenAISummaryFromEmail(email, serpData);
      console.log(bio);
      results.push({ email, bio })
    }

    await prisma.lead.createMany({
      data: results.map((result) => ({
        email: result.email,
        bio: result.bio,
        userId: upsertUser.id,
      }))
    });


    return res.status(200).json(results.slice(0, 3))

  } else {
    return res.status(400).json({ error: 'Bad request' })
  }
}


const getSerpDataForEmail = async (email: string) => {
  const serpRes = await axios.get(
    `https://api.serpdog.io/search?api_key=${process.env.SERPDOG_API_KEY}&q=${email}&gl=us`
  );
  const serpData = serpRes.data;
  const allSnippets = serpData.organic_results
    .map((result: any) => {
      return result.title + ". " + result.snippet;
    })
    .join(". ");

  return allSnippets;
};

const generateOpenAISummaryFromEmail = async (email: string, serpData: string) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    prompt: `This is search results on "${email}". Can you create a bio on this person? Be confident. "${serpData}"`,
  });

  return completion.data.choices[0].text || "No results";
};
