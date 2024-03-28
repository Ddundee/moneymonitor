"use client";
import { FormEvent, useContext, useState } from "react";
import { collection, addDoc, deleteDoc, doc, query, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { db } from '@/util/firebase/firebase-db';
import useSWR from "swr";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";

interface Item {
  name?: string;
  price?: number;
  id?: string;
}

export default function Home() {

  const { data, error, isLoading } = useSWR(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      let itemsArr: Item[] = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      })

      setItems(itemsArr);

      setTotal(itemsArr.reduce((sum, item) => sum + (item.price || 0), 0))
      unsubscribe()
      return itemsArr.reduce((sum, item) => sum + (item.price || 0), 0);
    })
  });

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ name: '', price: 0 });
  const [total, setTotal] = useState<number>(0);

  const addItem = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (newItem.name) {
      setItems([...items, newItem]);

      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price
      })

      setNewItem({ name: '', price: 0 });


    }
  }

  async function deleteItem(id: string | undefined) {
    if (id) {
      const itemRef = doc(collection(db, 'items'), id);
      await deleteDoc(itemRef);
    }
  }

  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      {currentUser ? (
        <div>
          <p>Email: {currentUser.email}</p>
          <button className="bg-blue-600 hover:bg-blue-700 duration-100 active:bg-blue-600 py-px px-10" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      ) : <Link href={'/login'}><button className="bg-blue-600 hover:bg-blue-700 duration-100 active:bg-blue-600 py-px px-10">Sign In</button></Link>}
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-sm">
          <form className="grid grid-cols-6 items-center text-black">
            <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="col-span-3 p-3 border mx-3" type="text" placeholder="Enter Item" />
            <input value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter $" />
            <button onClick={addItem} className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" type="submit">+</button>

          </form>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900">X</button>
              </li>
            ))}
          </ul>

          {items.length ? (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>

            </div>
          ) : ('')}
        </div>
      </div>
    </main>
  );
}
