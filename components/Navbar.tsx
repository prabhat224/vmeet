import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Mobilenav from './Mobilenav'
import { SignedIn,UserButton } from '@clerk/nextjs'
const Navbar = () =>{
  return (
    <div className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/'>
        <div className='text-white font-extrabold text-3xl '>VCMeet</div>
      </Link>
      <div className='flex-between gap-5'>
      <SignedIn>
        <UserButton />
      </SignedIn>
        <Mobilenav/>
      </div>
    </div>
  )
}

export default Navbar
