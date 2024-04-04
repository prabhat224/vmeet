import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  //get date and time function
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month because months are zero-indexed
  const day = ('0' + currentDate.getDate()).slice(-2);
  const hours = ('0' + currentDate.getHours()).slice(-2);
  const minutes = ('0' + currentDate.getMinutes()).slice(-2);
  const currentDateString = `${day}-${month}-${year}`;
  let val = parseInt(hours)
  const amPM = val >= 12 ? 'PM' : 'AM';
  val = val % 12 || 12;
  const currentTimeString = `${hours}:${minutes} ${amPM}`;
  return (
    <div className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
          <h2 className='glassmorphism max-w-[300px] rounded py-2 px-2 text-center text-base font-normal'>Upcoming meeting at : 12:30 pm</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-3xl font-extrabold lg:text-7xl'>{currentTimeString}</h1>
            <p className='text-lg font-medium text-sky-100 lg:font-2xl'>{currentDateString}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </div>
  )
}

export default Home
