'use client'

import {FormEvent, useState} from 'react'
import useSWR from 'swr'
import {v4 as uuid} from 'uuid'
import { Message } from '../typings';
import {fetcher} from '../utils/fetchMessages'
import { unstable_getServerSession } from 'next-auth';
type Props = {
    session: Awaited<ReturnType<typeof unstable_getServerSession>>
}
const ChatInput = ({session}: Props) => {
    const [input, setInput] = useState('')
    const {data: messages, error, mutate} = useSWR<Message[]>('/api/getMessages', fetcher)
    const addMessage = async (e: FormEvent<HTMLFormElement> )=>{
        e.preventDefault();
        if(!input || !session) return;
        const messageToSend = input;
        setInput('')
        const id = uuid()
        
        const message: Message = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: session?.user?.name!,
            profilePic: session?.user?.image!,
            email: session?.user?.email!
        }

        const uploadMessageToUpstash = async () => {
            
            const data = await fetch('/api/addMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                })
            }).then(res => res.json())
            return [data.message, ...messages!]
        }

        await mutate(uploadMessageToUpstash, {
            optimisticData: [message, ...messages!],
            rollbackOnError: true
        });
    }
  return (
    <form onSubmit ={addMessage} className='fixed w-full flex bg-secondary bottom-0 px-10 py-5 space-x-2 border-t border-secondary z-50'>
      <input type="text" 
      disabled={!session}
      placeholder="Start typing..."
      onChange={(e)=> setInput(e.target.value)}
        value={input}
      className="flex w-full rounded border border-gray-300  focus:outline-none placeholder:text-sm px-2  focus:ring-2 focus:ring-primary focus:border-transparent  disabled:opcaity-50 disabled:cursor-not-allowed"
      />
      <button
      disabled={!input}
        className={`bg-primary text-white py-2 px-10 rounded-lg font-random font-normal 
        text-xs sm:text-sm md:text-md hover:bg-secondary hover:text-primary 
        transition-all disabled:cursor-not-allowed disabled:opacity-50`}
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;
