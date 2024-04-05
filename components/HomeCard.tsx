"use client"
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
interface HomeCardProp{
    className:string,
    img:string,
    title:string,
    desc:string,
    handelClick:()=>void
}
const HomeCard = ({className,img,title,desc,handelClick}:HomeCardProp) => {
  return (
    <div className=''>
        <div className={cn(' px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[270px] rounded-[14px] cursor-pointer',className)} onClick={()=>{handelClick()}}>
            <div className='flex-center glassmorphism size-12 rounded-[12px]'>
                <Image src={img} alt='icon' width={24} height={24}/>
            </div>
            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
                <p className='text-lg font-normal'>{desc}</p>
            </div>
        </div>
      
    </div>
  )
}

export default HomeCard
