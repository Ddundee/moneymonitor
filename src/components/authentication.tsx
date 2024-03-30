"use client";
import { AuthContext } from "@/context/authContext";
import { auth, googleAuth } from "@/util/firebase/firebase-auth";
import { AuthError, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import GoogleLogo from '@/../public/google_logo.png'
import { useRouter } from "next/navigation";
// import Authentication from "@/components/authentication";

export function Login() {
    const [input, setInput] = useState<{ email: string, password: string }>({ email: '', password: '' });

    const router = useRouter();
    const { currentUser, signOut } = useContext(AuthContext)
    if (currentUser) return (
        <main className="flex justify-center w-screen h-screen items-center">
            <button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none" onClick={() => {
                signOut();
            }}>Sign Out</button>
        </main>
    )
    return (

        <div className="flex flex-col gap-8 rounded-lg border-[#cbd5e1] border p-6">
            <h1 className="text-lg font-semibold ">Login</h1>
            <div className="flex flex-col gap-4 text-md">
                <div className="flex gap-4 items-center">
                    <label className="w-20 text-end font-medium">Email</label>
                    <input value={input.email} onChange={(e) => { setInput({ ...input, email: e.target.value }) }} type="text" className="border border-[#cbd5e1] p-3 rounded-md w-72" />
                </div>
                <div className="flex gap-4 items-center">
                    <label className="w-20 text-end font-medium">Password</label>
                    <input value={input.password} onChange={(e) => { setInput({ ...input, password: e.target.value }) }} type="password" className="border border-[#cbd5e1] p-3 rounded-md w-72" />
                </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
                <button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none" onClick={() => {
                    signInWithEmailAndPassword(auth, input.email, input.password)
                        .then(userCredential => {
                            toast.success('Welcome');
                            setInput({ email: '', password: '' })
                            router.push('/');

                        })
                        .catch((error: AuthError) => {
                            toast.error('There was an error. Try again later.')
                            console.log(error.message)
                        })
                }}>Login</button>
                <button onClick={() => {
                    signInWithPopup(auth, googleAuth)
                        .then(userCredential => {
                            toast.success('Welcome');
                            setInput({ email: '', password: '' })
                            router.push('/');
                        })
                        .catch((error: AuthError) => {
                            toast.error('There was an error. Try again later.')
                            console.log(error.message)
                        })
                }} className="bg-[#f4f4f5] rounded-md hover:bg-[#ffffff] duration-300 text-md font-medium select-none text-[#0f172a]"><Image src={GoogleLogo} alt={""} width={40} height={40} /></button>
                <Link href={'/register'}>
                    <button className="border border-black px-4 py-2 rounded-md hover:border-[#404040] hover:text-[#404040] duration-300 text-md font-medium select-none text-[#0f172a]">Not a user? Register</button>
                </Link>


            </div>
        </div>


    );
}


export function Register() {
    const [input, setInput] = useState<{ email: string, password: string }>({ email: '', password: '' });
    const router = useRouter();
    const { currentUser, signOut } = useContext(AuthContext)
    if (currentUser) return (
        <main className="flex justify-center w-screen h-screen items-center">
            <button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none" onClick={() => {
                signOut();
            }}>Sign Out</button>
        </main>
    )
    return (

        <div className="flex flex-col gap-8 rounded-lg border-[#cbd5e1] border p-6">
            <h1 className="text-lg font-semibold ">Register</h1>
            <div className="flex flex-col gap-4 text-md">
                <div className="flex gap-4 items-center">
                    <label className="w-20 text-end font-medium">Email</label>
                    <input value={input.email} onChange={(e) => { setInput({ ...input, email: e.target.value }) }} type="text" className="border border-[#cbd5e1] p-3 rounded-md w-72" />
                </div>
                <div className="flex gap-4 items-center">
                    <label className="w-20 text-end font-medium">Password</label>
                    <input value={input.password} onChange={(e) => { setInput({ ...input, password: e.target.value }) }} type="password" className="border border-[#cbd5e1] p-3 rounded-md w-72" />
                </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
                <button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none" onClick={() => {
                    createUserWithEmailAndPassword(auth, input.email, input.password)
                        .then(userCredential => {
                            toast.success('Welcome');
                            setInput({ email: '', password: '' })
                            router.push('/');

                        })
                        .catch((error: AuthError) => {
                            toast.error('There was an error. Try again later.')
                            console.log(error.message)
                        })
                }}>Register</button>
                <button onClick={() => {
                    signInWithPopup(auth, googleAuth)
                        .then(userCredential => {
                            toast.success('Welcome');
                            setInput({ email: '', password: '' })
                            router.push('/');
                        })
                        .catch((error: AuthError) => {
                            toast.error('There was an error. Try again later.')
                            console.log(error.message)
                        })
                }} className="bg-[#f4f4f5] rounded-md hover:bg-[#ffffff] duration-300 text-md font-medium select-none text-[#0f172a]"><Image src={GoogleLogo} alt={""} width={40} height={40} /></button>
                <Link href={'/login'}>
                    <button className="border border-black px-4 py-2 rounded-md hover:border-[#404040] hover:text-[#404040] duration-300 text-md font-medium select-none text-[#0f172a]">Already a user? Login</button>
                </Link>


            </div>
        </div>


    );
}
