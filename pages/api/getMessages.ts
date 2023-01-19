// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client_redis from '../../redis'
import { Message } from '../../typings'
type Data = {
  messages: string
}
type ErrorData ={
    name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    if (req.method !== 'GET'){
        res.status(405).json({ name: 'Method not allowed' })
        return 
    }
    const messagesRes = await client_redis.hvals('message')
    const messages: Message[] = messagesRes.map((message) => JSON.parse(message)).sort((a,b ) => b.created_at - a.created_at)
    // console.log(messages)
    // console.log(JSON.stringify(messages))
    // console.log(JSON.parse(JSON.stringify(messages)))
    

  res.status(200).json({ messages:  JSON.stringify(messages) })
}
