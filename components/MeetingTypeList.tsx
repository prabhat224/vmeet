"use client"
import React from 'react'
import HomeCard from './HomeCard'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useUser } from '@clerk/nextjs'
import { Call } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
    const client=useStreamVideoClient()
    const user=useUser()
    const[values,setValues]=useState({
        dateTime:new Date(),
        description:'',
        link:''
    })
    const [callDetails,setCallDetails]=useState<Call>()
    const { toast } = useToast()
    const createMeeting=async () => {
        if(!user || !client)return;
        try{
            const id=crypto.randomUUID();
            const call=client.call('default',id);
            if(!call)throw Error('call did not connect')
            if(!values.dateTime)toast({ title: "Call cannot be set up"})
            const startsAt=values.dateTime.toISOString()|| new Date(Date.now()).toISOString();
            const description=values.description || 'Instant meeting'
            await call.getOrCreate({
                data:
                {
                    starts_at:startsAt,
                    custom:{
                        description
                    }
                }
            })
            setCallDetails(call);
            if(!values.description)
            {
                router.push(`meeting/${call.id}`)
            }
            toast({ title: "Meeting created"})

        }catch(error)
        {
            console.log("An error occured")
            toast({ title: "Call cannot be set up",})
        }

        
    }
    const [meetingStatus, meetingStatusSet] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'startInstantMeeting' | undefined>()
    const router = useRouter()
    return (
        <div className='grid cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="Join Meeting"
                desc="Join meeting uisng invite"
                handelClick={() => meetingStatusSet('startInstantMeeting')}
                className='bg-orange-1'
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                desc="Plan your meeting"
                handelClick={() => meetingStatusSet('isScheduleMeeting')}
                className='bg-blue-1'
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Add Meeting"
                desc="Add a new meeting"
                handelClick={() => console.log("handel click works")}
                // handelClick={() => meetingStatusSet('isJoiningMeeting')}
                className='bg-purple-1'
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                desc="Check out your recordings"
                handelClick={() => router.push('/recordings')}
                className='bg-yellow-1'
            />
            <MeetingModal
            isOpen={meetingStatus==='startInstantMeeting'}
            onClose={()=>meetingStatusSet(undefined)}
            title='Start an instant meeting'
            className='text-center'
            buttonText='Start Meeting'
            handelClick={createMeeting}
            />
        </div>
    )
}

export default MeetingTypeList
