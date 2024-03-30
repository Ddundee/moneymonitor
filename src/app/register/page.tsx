"use client";
import { Login, Register } from "@/components/authentication";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
// import Authentication from "@/components/authentication";

export default function Home() {

  const { currentUser, signOut } = useContext(AuthContext)
  if (currentUser) return (
    <main className="flex justify-center w-screen h-screen items-center">
      <button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none" onClick={() => {
        signOut();
      }}>Sign Out</button>
    </main>
  )
  return (
    <main className="flex flex-col h-screen items-center justify-center gap-7 sm:p-24 p-4">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />


      <Register />
      <Link href={'/'}><button className="bg-[#0f172a] px-4 py-2 text-white rounded-md hover:bg-[#404040] duration-300 text-md font-medium select-none">Go Home</button></Link>
    </main>
  );
}
