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
import { auth, db } from "./auth/auth";
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";
import { app } from "firebase-admin";
import { UserType } from "../types/UserType.type";
import { ApprovedRequestsType } from "../types/ApprovedRequests.type";
import { RequestsType } from "../types/Requests.type";

export const updateUserData = async (
    userUID: string,
    name: string,
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
            collection(db, "data"),
            where("uid", "==", userUID)
        );
        const querySnapShot = await getDocs(queryDb);
        const userData = querySnapShot.docs.map(doc => ({
            docID: doc.data().docID,
            id: doc.data().id,
            name: doc.data().name,
            admin: doc.data().admin,
            superAdmin: doc.data().superAdmin,
            nationalHolidays: doc.data().nationalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
            birthday: doc.data().birthday,
        }));
        return userData;
    } catch (error) {
        console.log(error);
    }
}

export async function listUsers(): Promise<UserType[]> {
    try {
        const queryDb = query(collection(db, "users"));
        const querySnapShot = await getDocs(queryDb);
        const userData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            name: doc.data().name,
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
            approvedBy: doc.data().approvedBy,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedBy: doc.data().requestedBy,
            totalDays: doc.data().totalDays,
        }));
        return approvedReqData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list approved requests from database");
    }
}

export async function listRequests(): Promise<RequestsType[]> {
    try {
        const queryDb = query(collection(db, "requests"));
        const querySnapShot = await getDocs(queryDb);
        const reqData = querySnapShot.docs.map(doc => ({
            approver: doc.data().approver,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedBy: doc.data().requestedBy,
            totalDays: doc.data().totalDays,
        }));
        return reqData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list requests from database");
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
