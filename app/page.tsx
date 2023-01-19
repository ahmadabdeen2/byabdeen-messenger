
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { Message } from '../typings'
import { unstable_getServerSession } from 'next-auth';
import { Providers } from './providers';
import Header from './Header';
const HomePage = async () => {

    const data = await fetch(`${process.env.VERCEL_URL}/api/getMessages`).then(res => res.json());
    const messages: Message[] = data.messages;
    const session = await unstable_getServerSession()
    console.log(session)
 
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