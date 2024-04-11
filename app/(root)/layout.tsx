import React, { ReactNode } from 'react'
import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "VCMeet",
  description: "A video confrencing app",
};
const layout = ({children}:{children:ReactNode}) => {
  return (
    <main>
      <StreamVideoProvider>
      {children}
      </StreamVideoProvider>
    </main>
  )
}
export default layout;
