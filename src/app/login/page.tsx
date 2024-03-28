"use client";
import { Toaster } from "react-hot-toast";
import Authentication from "@/components/authentication";

interface Item {
  name?: string;
  price?: number;
  id?: string;
}

export default function Home() {

  return (
    <main className="flex min-h-screen items-center justify-center gap-7 sm:p-24 p-4">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      {/* <ManualAuth />
      <div className="flex flex-col gap-3">
        
        <GoogleAuth />
      </div> */}
      <Authentication />
    </main>
  );
}
