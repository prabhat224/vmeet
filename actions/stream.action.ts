'use server'

import { currentUser } from "@clerk/nextjs";
import { SECRET_KEY } from "@clerk/nextjs/server";
import { StreamClient } from '@stream-io/node-sdk';
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSectre=process.env.STREAM_API_SECRET

export const tokenProvider=async()=>{
    const user=await currentUser();
    if(!user)throw new Error('Use is not logged in');
    if(!apiKey)throw new Error('Stream apiKey is in valid')
    if(!apiSectre)throw new Error('Stream apiSecret not available')

    const client=new StreamClient(apiKey,apiSectre)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    const issued=Math.floor(Date.now()/1000)-60;
    const token=client.createToken(user.id,exp,issued)
    return token;
}