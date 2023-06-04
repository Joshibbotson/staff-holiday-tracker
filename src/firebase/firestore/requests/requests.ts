import {
    Unsubscribe,
    query,
    collection,
    where,
    onSnapshot,
} from "firebase/firestore";
import { IncomingRequestsType } from "../../../types";
import { db } from "../../auth/auth";

export function subscribeToRequests(
    email: string,
    callback: (data: IncomingRequestsType[]) => void
): Unsubscribe {
    const queryDb = query(
        collection(db, "requests"),
        where("requestedByEmail", "==", email)
    );
    const unsubscribe = onSnapshot(queryDb, snapshot => {
        const reqData = snapshot.docs.map(doc => ({
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
        callback(reqData);
    });

    return unsubscribe;
}
