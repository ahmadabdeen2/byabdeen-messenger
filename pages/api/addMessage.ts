// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client_redis from '../../redis'
import { Message } from '../../typings'
import { serverPusher } from '../../pusher';
type Data = {
  message: string
}
type ErrorData ={
    name: string
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'POST'){
        res.status(405).json({ name: 'Method not allowed' })
        return 
    }
    const { message } = req.body;
    const newMessage = {
        ...message,
        created_at: Date.now(),
    }
    await client_redis.hset('message', message.id, JSON.stringify(newMessage))
    serverPusher.trigger("messages", "new-message",  newMessage)


  res.status(200).json({ message: JSON.stringify(newMessage) })
}
