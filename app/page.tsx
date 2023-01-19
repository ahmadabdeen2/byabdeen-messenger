
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '../typings'
import { unstable_getServerSession } from 'next-auth';
import { Providers } from './providers';
import Header from './Header';
import client_redis from '../redis';
const HomePage = async () => {
  
    const messagesRes = await client_redis.hvals('messages')
    const messages: Message[] = messagesRes
    .map((message) => JSON.parse(message))
    .sort((a, b) => a.created_at - b.created_at)


    
    const session = await unstable_getServerSession()

 
  return (
    <Providers session={session}>
    <main className='bg-secondary'>
    <Header session={session}/>
    <MessageList initial={messages}/>
    <ChatInput session={session}/>
    </main>
    </Providers>
  )
}

export default HomePage