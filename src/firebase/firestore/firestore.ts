import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    deleteDoc,
    where,
    or,
    orderBy,
    QueryFieldFilterConstraint,
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
import { EditRequestType } from "../../types/EditRequest.type";

import { randomColour } from "../../util-functions/randomColour";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { error } from "firebase-functions/logger";

// //firebase emulator//
// const db = getFirestore();
// connectFirestoreEmulator(db, "localhost", 8080);
// //////////

// export const currentUserUID: string = auth.currentUser!.uid;

export const updateUserDocID = async (
    userUID: string,
    name: string,
    email: string,
    totalHolidays: number,
    remainingHolidays: number,
    takenHolidays: number,
    flexTime: number,
    profilePic: string,
    nationalHolidays: string = "UK",
    managersEmail: string = "jitester20@gmail.com",
    admin: boolean = false,
    superAdmin: boolean = false,
    holidayTabColour: string = randomColour()
) => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, "users"), where("uid", "==", userUID))
        );

        if (!querySnapshot.empty) {
            // User already exists, do not add them again
            return;
        }

        const docRef = await addDoc(collection(db, "users"), {
            uid: userUID,
            name,
            email,
            nationalHolidays,
            totalHolidays,
            remainingHolidays,
            takenHolidays,
            flexTime,
            admin: admin,
            superAdmin: superAdmin,
            profilePic,
            managersEmail: managersEmail,
            holidayTabColour,
        });
        await updateDoc(docRef, { docID: docRef.id });
    } catch (err) {
        console.log(err);
    }
};

export const updateUserProfilePic = async (
    user: UserType,
    profilePicLocation: string,
    profilePicDownloadURL: string = ""
) => {
    try {
        const targetUser = await getUserDataViaEmail(user.email);

        const userRef = doc(db, "users", targetUser[0].docID);

        await updateDoc(userRef, {
            profilePicDownloadURL: profilePicDownloadURL,
            profilePic: profilePicLocation,
        });
        toast.success("Picture uploaded!");
    } catch (err) {
        console.log(err);
        toast.error("Something went wrong.");
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
            totalHolidays: doc.data().totalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
            docID: doc.data().docID,
            profilePic: doc.data().profilePic,
            profilePicDownloadURL: doc.data().profilePicDownloadURL,
            managersEmail: doc.data().managerEmail,
            holidayTabColour: doc.data().holidayTabColour,
        }));
        return currentUserData;
    } catch (error) {
        console.log(error);
        toast.error("Failed to list current user from the database");
        throw new Error("Failed to list current user from database");
    }
}

export async function getUserDataViaEmail(userEmail: string) {
    try {
        const queryDb = query(
            collection(db, "users"),
            where("email", "==", userEmail)
        );
        const querySnapShot = await getDocs(queryDb);
        const currentUserData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            name: doc.data().name,
            email: doc.data().email,
            admin: doc.data().admin,
            superAdmin: doc.data().superAdmin,
            totalHolidays: doc.data().totalHolidays,
            nationalHolidays: doc.data().nationalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
            docID: doc.data().docID,
            profilePic: doc.data().profilePic,
            managersEmail: doc.data().managerEmail,
            holidayTabColour: doc.data().holidayTabColour,
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
                where("superAdmin", "==", "true")
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
            totalHolidays: doc.data().totalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
            profilePic: doc.data().profilePic,
            profilePicDownloadURL: doc.data().profilePicDownloadURL,
            managersEmail: doc.data().managerEmail,
            holidayTabColour: doc.data().holidayTabColour,
        }));
        return userData;
    } catch (error) {
        console.log(error);
        toast.error("Failed to list users from database");

        throw new Error("Failed to list users from database");
    }
}

export async function listUsersUnderManager(
    currentUserEmail: string
): Promise<UserType[]> {
    try {
        let queryDb = query(
            collection(db, "users"),
            where("managersEmail", "==", currentUserEmail)
        );
        const querySnapShot = await getDocs(queryDb);
        const userData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            name: doc.data().name,
            email: doc.data().email,
            admin: doc.data().admin,
            superAdmin: doc.data().superAdmin,
            nationalHolidays: doc.data().nationalHolidays,
            totalHolidays: doc.data().totalHolidays,
            remainingHolidays: doc.data().remainingHolidays,
            takenHolidays: doc.data().takenHolidays,
            flexTime: doc.data().flexTime,
            profilePic: doc.data().profilePic,
            profilePicDownloadURL: doc.data().profilePicDownloadURL,
            managersEmail: doc.data().managerEmail,
            holidayTabColour: doc.data().holidayTabColour,
        }));
        return userData;
    } catch (error) {
        console.log(error);
        toast.error("Failed to list users from database");

        throw new Error("Failed to list users from database");
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
            name: doc.data().name,
            approverEmail: doc.data().approverEmail,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedByEmail: doc.data().requestedByEmail,
            totalDays: doc.data().totalDays,
            typeOfLeave: doc.data().typeOfLeave,
            holidayTabColour: doc.data().holidayTabColour,
        }));
        return reqData;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to list requests from database");
    }
}

export async function listRequestsForApproval(
    email: string
): Promise<IncomingRequestsType[]> {
    try {
        const queryDb = query(
            collection(db, "requests"),
            where("approverEmail", "==", email)
        );
        const querySnapShot = await getDocs(queryDb);
        const reqData = querySnapShot.docs.map(doc => ({
            uid: doc.data().uid,
            name: doc.data().name,
            approverEmail: doc.data().approverEmail,
            dateStart: doc.data().dateStart,
            dateEnd: doc.data().dateEnd,
            requestedByEmail: doc.data().requestedByEmail,
            totalDays: doc.data().totalDays,
            typeOfLeave: doc.data().typeOfLeave,
            holidayTabColour: doc.data().holidayTabColour,
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

export async function editRequest(
    updatedRequest: EditRequestType
): Promise<void> {
    console.log(updatedRequest);
    try {
        const reqRef = doc(db, "requests", updatedRequest.uid);
        await updateDoc(reqRef, {
            dateStart: updatedRequest.newDateStart,
            dateEnd: updatedRequest.newDateEnd,
            totalDays: updatedRequest.newTotalDays,
            typeOfLeave: updatedRequest.newTypeOfLeave,
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add request to database");
    }
}

export async function deleteRequest(requestId: string): Promise<void> {
    try {
        const requestDocRef = doc(db, "requests", requestId);
        await deleteDoc(requestDocRef);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete request from database");
    }
}
export async function approveRequest(
    request: IncomingRequestsType
): Promise<void> {
    try {
        const requestDocRef = doc(db, "requests", request.uid);
        //add request to approved requests
        await addDoc(collection(db, "approvedRequests"), {
            uid: request.uid,
            name: request.name,
            approverEmail: request.approverEmail,
            dateStart: request.dateStart,
            dateEnd: request.dateEnd,
            requestedByEmail: request.requestedByEmail,
            totalDays: request.totalDays,
            typeOfLeave: request.typeOfLeave,
            holidayTabColour: request.holidayTabColour,
        });
        //remove un needed request
        await deleteDoc(requestDocRef);

        //update user's reminaing holidays and taken holidays appropriately
        const user = await getUserDataViaEmail(request.requestedByEmail);
        console.log(user);
        const userRef = doc(db, "users", user[0].docID);
        await updateDoc(userRef, {
            remainingHolidays: user[0].remainingHolidays - request.totalDays,
            takenHolidays: user[0].takenHolidays + request.totalDays,
        });

        console.log("updated");
    } catch (error) {
        console.log(error);
        toast.error("Failed approval");
        throw new Error("Failed approve request and delete existing request");
    }
}
