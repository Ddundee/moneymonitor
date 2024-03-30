"use client";
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type Props = {}
interface Item {
    emoji?: string;
    name?: string;
    price?: string;
    id?: string;
    ownerId?: string;
}



export default function page({ }: Props) {
    const { currentUser, signOut } = useContext(AuthContext);
    const router = useRouter()
    if (currentUser) {
        const [items, setItems] = useState<Item[]>([
            {
                emoji: "🍔",
                name: "Chick-Fil-A",
                price: "11.00",
                id: "asdasda",
                ownerId: "123123123123"
            },
            {
                emoji: "🍔",
                name: "House",
                price: "410135.92",
                id: "asdf",
                ownerId: "123123123123"
            },
            {
                emoji: "🍔",
                name: "Pizza",
                price: "12.99",
                id: "asda11j31lk2j31lk2j3",
                ownerId: "123123123123"
            },

        ]);
        const [newItem, setNewItem] = useState<Item>({
            // emoji: "",
            name: "",
        });


        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
                <div className='flex flex-col gap-3'>
                    <div className='border border-[#e5e7eb] rounded p-4 flex gap-2 shadow-md text-base font-normal [&>*]:border [&>*]:rounded-sm [&>*]:border-[#e5e5e5]'>
                        {/* <input value={newItem.emoji} type='text' className='w-5' /> */}
                        <input value={newItem.name} onChange={(e) => { setNewItem({ ...newItem, name: e.target.value }) }} className='w-60 truncate px-2' type='text' placeholder='name' />
                        <input value={newItem.price} onChange={(e) => { setNewItem({ ...newItem, price: e.target.value }) }} className='w-20 text-end' type='number' placeholder='price' />
                        <button onClick={() => {
                            if (newItem.name && newItem.price) {
                                toast.success('Added new item');
                                setItems([...items, newItem])
                            }
                            else {
                                toast.error('Enter something valid into the inputs')
                            }
                        }}>+</button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {items.map((item) => (
                            <button className='border border-[#e5e7eb] rounded p-4 flex gap-2 shadow-md text-base font-normal' onClick={() => {
                                toast.success("Removed item")
                                setItems(items.slice(0, items.indexOf(item)).concat(items.slice(items.indexOf(item) + 1)))
                            }}>
                                {/* <p>{item.emoji}</p> */}
                                <p className='w-60 truncate text-start'>{item.name}</p>
                                <p className='w-24 text-end'>${parseInt(item.price ? item.price : "0")}</p>
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
    else router.push('/')

}