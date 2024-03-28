"use client";
import { SignOutUser, userStateListener } from "@/util/firebase/firebase-auth";
import { User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";

interface Props {
    children?: ReactNode
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user: User) => { },
    signOut: () => {}
})

export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    // const router = useRouter();

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) setCurrentUser(user);
        })
        return unsubscribe;
    }, [setCurrentUser]);

    const signOut = () => {
        SignOutUser();
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        setCurrentUser,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}