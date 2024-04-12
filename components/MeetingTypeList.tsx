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
import { Textarea } from "@/components/ui/textarea"
import ReactDatePicker from 'react-datepicker';


const MeetingTypeList = () => {
    const client = useStreamVideoClient()
    const user = useUser()
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
    const createMeeting = async () => {
        if (!user || !client) return;
        try {
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw Error('call did not connect')
            if (!values.dateTime) toast({ title: "Call cannot be set up" })
            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant meeting'
            await call.getOrCreate({
                data:
                {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetails(call);
            if (!values.description) {
                router.push(`meeting/${call.id}`)
            }
            toast({ title: "Meeting created" })
        } catch (error) {
            console.log("An error occured")
            toast({ title: "Call cannot be set up", })
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
            {(!callDetails) ? (
                <MeetingModal
                    isOpen={meetingStatus === 'isScheduleMeeting'}
                    onClose={() => meetingStatusSet(undefined)}
                    title='Create Meeting'
                    handelClick={createMeeting}
                >
                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>add a description</label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0'
                            onChange={(e) => {
                                setValues({ ...values, description: e.target.value })
                            }} />
                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>Select date and time</label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (<MeetingModal
                isOpen={meetingStatus === 'isScheduleMeeting'}
                onClose={() => meetingStatusSet(undefined)}
                title='Start Meeting'
                className='text-center'
                handelClick={() => {
                    navigator.clipboard.writeText(meetingLink);
                    toast({ title: 'Link Copied' });
                }}
                image='/icons/checked.svg'
                buttonIcon='/icons/copy.svg'
                buttonText='Copy Meeting Link'
            />)}
            <MeetingModal
                isOpen={meetingStatus === 'startInstantMeeting'}
                onClose={() => meetingStatusSet(undefined)}
                title='Start an instant meeting'
                className='text-center'
                buttonText='Start Meeting'
                handelClick={createMeeting}
            />
        </div>
    )
}

export default MeetingTypeList
