import { app } from "../firebase";
import * as admin from "firebase-admin";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    getFirestore,
} from "firebase/firestore";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    Auth,
} from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const db = getFirestore(app);
export const auth: Auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export function getErrorMessage(error: any): string {
    switch (error.code) {
        case "auth/user-not-found":
            return "Invalid email or password";
        case "auth/wrong-password":
            return "Invalid email or password";
        case "auth/too-many-requests":
            return "Too many unsuccessful login attempts. Please try again later.";
        case "auth/email-already-in-use":
            return "Email already in use";
        default:
            return "An error occurred. Please try again.";
    }
}

export async function signInWithGoogle() {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        const queryDb = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
        );
        //this looks for the user
        const docs = await getDocs(queryDb);
        //if nothing is returned, it's a new user so add to db
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                admin: false,
                superAdmin: false,
                nationalHolidays: 0,
                remainingHolidays: 0,
                takenHolidays: 0,
                flexTime: 0,
                birthday: undefined,
            });
        }
    } catch (error) {
        console.log(error);
    }
}
// just signs the user in using firebase signin func
export async function logInWithEmailAndPassword(
    email: string,
    password: string
) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        toast.error(getErrorMessage(error));

        console.log(error);
    }
}

export async function registerWithEmailAndPassword(
    email: string,
    password: string
) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error));

        throw error;
    }
}

export async function sendPasswordReset(email: string) {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Passowrd reset link sent!");
    } catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error));

        throw error;
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        toast.error(getErrorMessage(error));
        console.log(error);

        throw error;
    }
}
