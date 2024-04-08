'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import { error } from 'console'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(boolean)=>void}) => {
  const [isMicCamEnable,setIsMicCamEnable]=useState(false)
  const call=useCall();
  const handelToggle=(val:boolean)=>{
    if(isMicCamEnable)setIsMicCamEnable(false)
    else setIsMicCamEnable(true)
  return;
  }
  useEffect(()=>{
    if(isMicCamEnable)
    {
      call?.camera.disable();
      call?.microphone.disable()
    }
    else{
      call?.camera.enable()
      call?.microphone.enable()
    }
    if(!call) throw new Error('Call failed')

  },[isMicCamEnable,call?.camera,call?.microphone])
  return (
    <div className='flex flex-col items-center gap-3 text-white w-full h-screen justify-center'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
      <div className='flex h-16 item-center justify-center gap-3'>
        <label className='flex items-center justify-center gap-2 font-medium'>
        join with mic and camera off
          <input
          type='checkbox'
          checked={isMicCamEnable} 
          onClick={()=>handelToggle(isMicCamEnable)}/>
        </label>
        <DeviceSettings/>
      </div>
        <Button className='bg-green-500 px-4 py-2.5 rounded-md' onClick={()=>{
          call?.join()
          setIsSetupComplete(true)
        }}>Join meeting</Button>
    </div>
  )
}

export default MeetingSetup
