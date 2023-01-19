import React from 'react'
import {getProviders, signIn} from 'next-auth/react'
import Image from 'next/image'
import logo from '../../../public/assets/logo.svg'
import SignInComponent from './SignInComponent'

const SignInPage = async () => {
    const providers = await getProviders()
  return (

    <div className='bg-secondary flex flex-col justify-start items-center h-[85vh]'>
        <h2 className='font-random font-semibold text-md sm:text-2xl md:text-5xl pt-40 pb-20'> Welcome to Gossip by abdeen!</h2>
        <SignInComponent providers={providers}/>
    </div>
  )
}

export default SignInPage