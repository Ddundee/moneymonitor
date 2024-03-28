import { app } from "@/util/firebase/firebase";
import { GoogleAuthProvider, NextOrObserver, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signInUser = async(email: string, password: string) => {
    if (!email && !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const userStateListener = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback);
}

export const SignOutUser = async () => await signOut(auth);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();