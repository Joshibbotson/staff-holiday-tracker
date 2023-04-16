import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    deleteDoc,
    where,
} from "firebase/firestore";
import { auth, db } from "../auth/auth";
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";
import { app } from "firebase-admin";
import { UserType } from "../../types/UserType.type";
import { ApprovedRequestsType } from "../../types/ApprovedRequests.type";
import { IncomingRequestsType } from "../../types/IncomingRequests.type";
import { OutgoingRequestData } from "../../types/OutgoingRequestData.type";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// //firebase emulator//
// const db = getFirestore();
// connectFirestoreEmulator(db, "localhost", 8080);
// //////////

// export const currentUserUID: string = auth.currentUser!.uid;

export const updateUserData = async (
    userUID: string,
    name: string,
    email: string,
    remainingHolidays: number,
    takenHolidays: number,
    flexTime: number,
    nationalHolidays: string = "UK",
    admin: boolean = false,
    superAdmin: boolean = false
) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            uid: userUID,
            name,
            email,
            nationalHolidays,
            remainingHolidays,
            takenHolidays,
            flexTime,
            admin: false,
            superAdmin: false,
        });
        await updateDoc(docRef, { docID: docRef.id });
    } catch (err) {
        console.log(err);
    }
};

export async function getUserData(userUID: string) {
    try {
        const queryDb = query(
            collection(db, "users"),
            where("uid", "==", userUID)
        );
        const querySnapShot = await getDocs(queryDb);
        const currentUserData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            name: doc.data().name,
            email: doc.data().email,
            admin: doc.data().admin,
            superAdmin: doc.data().superAdmin,
            nationalHolidays: doc.data().nationalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
        }));
        return currentUserData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list current user from database");
    }
}

export async function listUsers(
    admin: boolean,
    superAdmin: boolean
): Promise<UserType[]> {
    try {
        let queryDb;
        if (admin) {
            queryDb = query(
                collection(db, "users"),
                where("admin", "==", "true")
            );
        }
        if (superAdmin) {
            queryDb = query(
                collection(db, "users"),
                where("superSdmin", "==", "true")
            );
        } else {
            queryDb = query(collection(db, "users"));
        }
        const querySnapShot = await getDocs(queryDb);
        const userData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            name: doc.data().name,
            email: doc.data().email,
            admin: doc.data().admin,
            superAdmin: doc.data().superAdmin,
            nationalHolidays: doc.data().nationalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
        }));
        return userData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list users from database");
    }
}
export async function listApprovedRequests(): Promise<ApprovedRequestsType[]> {
    try {
        const queryDb = query(collection(db, "approvedRequests"));
        const querySnapShot = await getDocs(queryDb);
        const approvedReqData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            approverEmail: doc.data().approvedBy,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedByEmail: doc.data().requestedBy,
            totalDays: doc.data().totalDays,
        }));
        return approvedReqData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list approved requests from database");
    }
}

export async function listRequests(
    email: string
): Promise<IncomingRequestsType[]> {
    try {
        const queryDb = query(
            collection(db, "requests"),
            where("requestedByEmail", "==", email)
        );
        const querySnapShot = await getDocs(queryDb);
        const reqData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            approverEmail: doc.data().approverEmail,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedByEmail: doc.data().requestedByEmail,
            totalDays: doc.data().totalDays,
        }));
        return reqData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list requests from database");
    }
}

export async function addRequest(request: OutgoingRequestData): Promise<void> {
    try {
        const requestsCollection = collection(db, "requests");
        const docRef = await addDoc(requestsCollection, request);
        const uid = docRef.id;
        const requestDocRef = doc(db, docRef.path); // create a DocumentReference from the document path
        await updateDoc(requestDocRef, { uid }); // set the uid field to the document's ID
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add request to database");
    }
}

export async function editRequest(request: OutgoingRequestData): Promise<void> {
    try {
        const requestsCollection = collection(db, "requests");
        await addDoc(requestsCollection, request);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add request to database");
    }
}

// export const editUserData = async (
//     docID: string,
//     name: string,
//     dueDate: string
// ) => {
//     try {
//         const taskRef = doc(db, "tasks", docID)
//         await updateDoc(taskRef, { name, dueDate, tag })
//     } catch (err) {
//         console.error(err)
//     }
// }
