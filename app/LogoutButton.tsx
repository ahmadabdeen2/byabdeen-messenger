'use client'
import {signOut} from 'next-auth/react'

const LogoutButton = () => {
  return (
    <button  
    onClick={() => signOut()}
    className={`bg-primary text-white py-2 px-4 rounded-lg font-random font-normal text-xs sm:text-sm md:text-md hover:bg-secondary hover:text-primary transition-all `}> Sign Out </button>
  )
}

export default LogoutButton