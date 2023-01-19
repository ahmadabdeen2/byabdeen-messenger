// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client_redis from '../../redis'
import { Message } from '../../typings'
import { serverPusher } from '../../pusher';

type Data = {
  message: Message
}

type ErrorData = {
  body: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method Not Allowed' })
    return
  }

  const { message } = req.body

  const newMessage = {
    ...message,
    // - Replace the timestamp of the user to the timestamp of the server.
    created_at: Date.now(),
  }

  // - Push to Upstash Redis db
  await client_redis.hset('messages', message.id, JSON.stringify(newMessage))
  // - Push to Pusher
  await serverPusher.trigger('messages', 'new-message', newMessage)

  res.status(201).json({ message: newMessage })
}