import { VideoPreview } from '@stream-io/video-react-sdk'
import React from 'react'

const MeetingSetup = () => {
  return (
    <div className='flex flex-col items-center gap-3 text-white w-full h-screen justify-center'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
    </div>
  )
}

export default MeetingSetup
