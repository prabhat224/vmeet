import React, { ReactNode } from 'react'
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "VCMeet",
  description: "A video confrencing app",
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='relative'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 max-sm:px-14'>
          {children}
        </section>
      </div>

    </main>
  )
}

export default HomeLayout;
