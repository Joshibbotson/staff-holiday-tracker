import {
    addDoc,
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    deleteDoc,
    where,
} from "firebase/firestore"
import { db } from "./auth"

export const updateUserData = async (
    userUID: string,
    id: string,
    name: string,
    remainingHolidays: number,
    takenHolidays: number,
    flexTime: number,
    birthday: string,
    admin: boolean = false,
    superAdmin: boolean = false,
    nationalHolidays: string = "UK"
) => {
    try {
        const docRef = await addDoc(collection(db, "data"), {
            uid: userUID,
            name,
            admin: false,
            superAdmin: false,
            nationalHolidays,
            remainingHolidays,
            takenHolidays,
            flexTime,
            birthday,
        })
        await updateDoc(docRef, { docID: docRef.id, id })
    } catch (err) {
        console.log(err)
    }
}

export async function getUserData(userUID: string) {
    try {
        const queryDb = query(
            collection(db, "data"),
            where("uid", "==", userUID)
        )
        const querySnapShot = await getDocs(queryDb)
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
        }))
        return userData
    } catch (error) {
        console.log(error)
    }
}
