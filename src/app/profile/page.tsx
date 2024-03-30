"use client";
import { AuthContext } from '@/context/authContext';
import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/util/firebase/firebase-db';
import Link from 'next/link';
import Image from 'next/image';
import PFP from '@/../public/pfp.png'

type Props = {}
interface Item {
    emoji?: string;
    name?: string;
    price?: string;
    id?: string;
}



export default function page({ }: Props) {
    const { currentUser, signOut } = useContext(AuthContext);

    if (currentUser) {




        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Image src={PFP} alt={''} width={63} height={63} />
                <Link href={'/'}>
                    <button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none" onClick={() => {
                        signOut();
                    }}>Sign Out</button>
                </Link>

            </div>
        )
    }
    else {
        return (
            <div className='flex h-screen w-screen justify-center items-center'>
                <Link href={'/'}><button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none">How did you get here?</button></Link>
            </div>
        )
    }

}