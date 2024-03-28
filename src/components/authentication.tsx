
import React, { useContext, useEffect, useState } from 'react';
import { AuthError, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/authContext';
import { auth, googleAuth } from '@/util/firebase/firebase-auth';

type Props = {}

export default function Authentication({ }: Props) {
    const [input, setInput] = useState<{ email: string, password: string }>({ email: '', password: '' });
    const [cred, setCred] = useState<UserCredential>();

    const { currentUser, signOut } = useContext(AuthContext);
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);
    if (currentUser) { }
    return (
        <div>
            {currentUser ? (
                <div>
                    <button className='bg-blue-600 hover:bg-blue-700 duration-100 active:bg-blue-600 py-px px-10' onClick={() => {
                        signOut();
                        toast.success("Signed Out")
                    }}>Sign Out</button>
                    <p>User Email: {currentUser.email}</p>
                </div>
            ) :
                <div className='flex items-center gap-10'>
                    <div>
                        <form className='flex flex-col gap-2'>
                            <label>Email</label>
                            <input value={input.email} onChange={(e) => { setInput({ ...input, email: e.target.value }) }} className='text-black' type='email' placeholder='Email' />
                            <label>Password</label>
                            <input value={input.password} onChange={(e) => { setInput({ ...input, password: e.target.value }) }} className='text-black' type='password' placeholder='Password' />
                            <button onClick={(e) => {
                                e.preventDefault();
                                createUserWithEmailAndPassword(auth, input.email, input.password)
                                    .then((userCredential) => {
                                        toast.success('Created User');
                                        setInput({ email: '', password: '' })
                                    })
                                    .catch((error: AuthError) => {
                                        signInWithEmailAndPassword(auth, input.email, input.password)
                                            .then((userCredential) => {
                                                toast.success('Signed In');
                                                setInput({ email: '', password: '' });
                                            })
                                            .catch((error: AuthError) => {
                                                toast.error(error.code)
                                            });

                                    });

                            }} className='bg-blue-600 hover:bg-blue-700 duration-100 active:bg-blue-600' type='submit'>Create User / Sign In</button>
                        </form>
                        <p>Email: {input.email}</p>
                        <p>Password: {input.password}</p>
                    </div>
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            signInWithPopup(auth, googleAuth)
                                .then((result) => {
                                    toast.success('Signed In')
                                    console.log(result)
                                })
                                .catch((error: AuthError) => {
                                    console.log(error)
                                })
                        }} className='bg-blue-600 hover:bg-blue-700 duration-100 active:bg-blue-600 py-px px-10' type='submit'>Sign in with google</button>
                    </div>
                </div>


            }
        </div>
    )
}