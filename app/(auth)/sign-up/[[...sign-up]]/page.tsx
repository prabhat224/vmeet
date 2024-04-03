import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <div className='flex justify-center items-center mt-2'>
      <SignUp/>
    </div>
  )
}

export default SignUpPage