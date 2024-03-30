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


        const [items, setItems] = useState<Item[]>([
            // {
            //     emoji: "🍔",
            //     name: "Chick-Fil-A",
            //     price: "11.00",
            //     id: "asdasda",
            //     ownerId: "123123123123"
            // },
            // {
            //     emoji: "🍔",
            //     name: "House",
            //     price: "410135.92",
            //     id: "asdf",
            //     ownerId: "123123123123"
            // },
            // {
            //     emoji: "🍔",
            //     name: "Pizza",
            //     price: "12.99",
            //     id: "asda11j31lk2j31lk2j3",
            //     ownerId: "123123123123"
            // },

        ]);
        const [newItem, setNewItem] = useState<Item>({
            // emoji: "",
            name: "",
        });

        const addItem = async ({ name, price }: Item) => {
            try {
                const docRef = await addDoc(collection(db, `${currentUser.email}`), {
                    name,
                    price,
                });
                setItems([...items, { name, price, id: docRef.id }])
                console.log(docRef)
            }
            catch (e) {
                console.error("Error adding document: ", e);
            }

        }

        const getItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, `${currentUser.email}`));
                const fetchedItems: Item[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetchedItems.push({ name: data.name, price: data.price, id: doc.id });
                });
                setItems(fetchedItems);
            } catch (e) {
                console.error('Error getting documents: ', e);
            }
        };


        const removeItems = async ({ name, price, id }: Item) => {
            try {
                const itemRef = doc(collection(db, `${currentUser.email}`), id);
                await deleteDoc(itemRef)
            }
            catch (e) {
                console.error("Error removing document: ", e);
            }
        }

        useEffect(() => {
            getItems();
        }, [currentUser])

        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
                <Link href={'/profile'}><button className='w-16 h-16 border rounded-full overflow-hidden flex justify-center items-center'><Image src={PFP} alt={''} width={63} height={63} /></button></Link>
                <div className='flex flex-col gap-3'>
                    <div className='border border-[#e5e7eb] rounded p-4 flex gap-2 shadow-md text-base font-normal [&>*]:border [&>*]:rounded-sm [&>*]:border-[#e5e5e5]'>
                        {/* <input value={newItem.emoji} type='text' className='w-5' /> */}
                        <input value={newItem.name} onChange={(e) => { setNewItem({ ...newItem, name: e.target.value }) }} className='w-60 truncate px-2' type='text' placeholder='name' />
                        <input value={newItem.price} onChange={(e) => { setNewItem({ ...newItem, price: e.target.value }) }} className='w-20 text-end' type='number' placeholder='price' />
                        <button onClick={() => {
                            if (newItem.name && newItem.price) {
                                toast.success('Added new item');
                                addItem(newItem)
                                setNewItem({ name: "", price: "" })
                            }
                            else {
                                toast.error('Enter something valid into the inputs')
                            }
                        }}>+</button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {items.map((item) => (
                            <button className='border border-[#e5e7eb] rounded p-4 flex gap-2 shadow-md text-base font-normal hover:[&>.first]:opacity-20 duration-1000' onClick={() => {
                                toast.success("Removed item")
                                removeItems(item);
                                setItems(items.slice(0, items.indexOf(item)).concat(items.slice(items.indexOf(item) + 1)))
                            }}>
                                {/* <p>{item.emoji}</p> */}
                                <div className='flex first'>
                                    <p className='w-60 truncate text-start'>{item.name}</p>
                                    <p className='w-24 text-end'>${parseFloat(item.price ? item.price : "0")}</p>
                                </div>
                                <div className='absolute items-center w-[350px] opacity-0 hover:opacity-100 bg-white bg-opacity-70'>
                                    <button onClick={() => {

                                    }}>X</button>
                                </div>
                            </button>
                        ))}
                    </div>
                    {items.length == 0 ? ("") : <hr />}
                    {items.length == 0 ? (
                        ""
                    ) : (
                        <div className='flex w-full [&>*]:w-1/2 px-4'>
                            <p className=''>Total</p>
                            <p className='text-end'>${items.reduce((accumulator: number, currentValue: Item) => accumulator + (currentValue.price ? parseFloat(currentValue.price) : 0), 0)}</p>
                        </div>
                    )}
                </div>
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