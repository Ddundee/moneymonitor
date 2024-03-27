"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { collection, addDoc, getDoc, QuerySnapshot, query, onSnapshot, DocumentData, deleteDoc, doc } from "firebase/firestore";
import { db } from '@/util/firebase/firebase';

interface Item {
  name?: string;
  price?: number;
  id?: string;
}

export default function Home() {

  const [items, setItems] = useState<Item[]>([
    // { name: 'Coffee', price: 4.95 },
    // { name: 'Movie', price: 24.95 },
    // { name: 'candy', price: 7.95 },
  ]);
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

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      let itemsArr:Item[] = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id});
      })

      setItems(itemsArr);

      setTotal(itemsArr.reduce((sum, item) => sum + (item.price || 0), 0))
      return () => unsubscribe();
    })
  }, [])

  async function deleteItem(id: string | undefined) {
    if (id) {
      const itemRef = doc(collection(db, 'items'), id);
      await deleteDoc(itemRef);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-sm">
          <form className="grid grid-cols-6 items-center text-black">
            <input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className="col-span-3 p-3 border mx-3" type="text" placeholder="Enter Item" />
            <input value={newItem.price} onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})} className="col-span-2 p-3 border mx-3" type="number" placeholder="Enter $" />
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
