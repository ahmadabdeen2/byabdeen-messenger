import {Message }   from '../typings'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import TimeAgo from 'react-timeago'

type Props = { 
    message: Message,
    
}

const MessageComponent = ({message}: Props) => {

const {data:session} = useSession();
const isUser = session?.user?.email === message.email;

  return (
    <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
        <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
            <Image src={message.profilePic} alt='profile_pic' height={10} width={50} className='rounded-full mx-2'/>
        </div>
        <div >
            <p className={`text-[0.65rem] px-[2px] pb-[2px]  ${isUser ? 'text-primary text-right' : 'text-gray-500 text-left'}`}> {message.username} </p>
            <div className='flex items-end'>
                <div className={`px-3 py-2 rounded-lg w-fit  ${isUser ? 'bg-white ml-auto order-2 text-primary' : 'bg-primary text-white' }`}>
                    <p> {message.message}</p>
                </div>
                <p className={`text-[0.65rem] italic px-2 text-gray-500 ${isUser && 'text-right'}`}><TimeAgo date={new Date(message.created_at).toLocaleString()}/></p>
                
            </div>
        </div>
    </div>
  )
}

export default MessageComponent