import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'POST') {
    const notes = String(req.body.notes);
    const result = await prisma.admin.create({ data: { notes } })

    return res.status(200).json(result)

  } else {
    return res.status(400).json({ error: 'Bad request' })
  }
}
