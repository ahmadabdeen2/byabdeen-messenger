'use client'
import {signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const LogoutButton = () => {
    const router = useRouter()


  return (
    <button  
    onClick={() => signOut({callbackUrl: '/auth/signin'})}
    className={`bg-primary text-white py-2 px-4 rounded-lg font-random font-normal text-xs sm:text-sm md:text-md hover:bg-secondary hover:text-primary transition-all `}> Sign Out </button>
  )
}

export default LogoutButton