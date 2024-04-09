import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { LayoutList, User } from 'lucide-react'

const MeetingRoom = () => {
  type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'
  const [showParticipants, setShowParticipants] = useState(false)
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-left':
        return <SpeakerLayout participantsBarPosition={'right'} />
      default:
        return <SpeakerLayout participantsBarPosition={'left'} />
    }
  }
  return (
    <div className='relative h-screen w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center'>
          <CallLayout />
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2', { 'show-block': showParticipants })}>
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
        <CallControls />
        <DropdownMenu>
          <div className='flex items-center'>
          <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <LayoutList size={20} className='text-white'/>
          </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white'>
            {
              ['grid','layout-left','layout-right'].map((item,indx)=>{
                return (
                  <div key={indx} className=''>
                    <DropdownMenuItem className='cursor-pointer' onClick={()=>setLayout(item.toLowerCase() as CallLayoutType)}>
                      {item}</DropdownMenuItem>
                      <DropdownMenuSeparator/>
                  </div>
                )

              })
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>
        <button onClick={()=>{
          setShowParticipants((prev=>!prev))
        }}>
          <div className='cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <User className='text-white' size={20}/>
          </div>
        </button>
      </div>
    </div>
  )
}
export default MeetingRoom
