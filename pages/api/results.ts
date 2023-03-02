import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from "../../lib/prisma"


export default async function (req: NextApiRequest, res: NextApiResponse) {

  if (req.method === "GET") {
    const email = String(req.query.email)


    const results = await prisma.user.findFirstOrThrow({
      where: {
        email
      }
      , include: {
        leads: true
      }
    })

    return res.status(200).json(results)
  } else { return res.status(400).json({ error: 'Bad request' }) }
}
