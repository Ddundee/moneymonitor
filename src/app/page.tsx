"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import Cubes3D from "@/components/cubes3d";
import { useRouter } from "next/navigation";

interface Item {
  name?: string;
  price?: number;
  id?: string;
  ownerId?: string;
}

export default function Home() {

  const { currentUser, signOut } = useContext(AuthContext);
  const router = useRouter();

  if (currentUser) router.push('/home')

  return (
    <main className="h-screen w-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
        <div className="max-w-[752px] h-full text-center md:text-left">
          <div className="w-full h-[53px]" />
          <Link href="/">
            <h2 className="text-2xl font-regular hover:text-[#6E6E6E] duration-500">
              MoneyMonitor
            </h2>
          </Link>
          <div className="w-full h-[35%]" />
          <h1 className="text-5xl leading-tight">
            Track, Analyze, and<br /> Master Your Finances
          </h1>
          <p className="text-[#525252]">
            Transform your relationship with money and take charge of your financial<br />
            well-being with our intuitive expense tracking app, designed to help you<br />
            build a brighter, more secure future.
          </p>
          <div className="flex gap-2 mt-5">
            <Link href={"/login"}>
              <button className="text-white font-regular text-xl border bg-black rounded-md px-5 py-1 select-none hover:bg-neutral-700 duration-300">
                Login
              </button>
            </Link>
            <Link href={"/register"}>
              <button className="text-black font-regular text-xl border border-black rounded-md px-5 py-1 select-none hover:text-neutral-700 hover:border-neutral-700">
                Register
              </button></Link>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2 h-full bg-black overflow-hidden">
        <div className="w-full h-24 justify-end">
          <div className="w-full h-[53px] items-end" />
          <div className="flex justify-end">
            <Link href="/register">
              <button className="relative overflow-hidden text-white font-medium text-xl border border-white rounded-md px-5 duration-300 hover:px-8 py-1 select-none group">
                <span className="relative right-0 group-hover:right-4 transition-all duration-300 ease-in-out">
                  Register
                </span>
                <span className="leading-9 absolute top-0 -right-full group-hover:right-2 transition-all duration-300 ease-in-out">
                  -&gt;
                </span>
              </button>
            </Link>
            <div className="h-full w-[124px]" />
          </div>
        </div>
        <Cubes3D />
      </div>
    </main>
  )
}
