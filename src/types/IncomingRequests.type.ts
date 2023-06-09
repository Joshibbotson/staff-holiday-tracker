import { Timestamp } from "firebase-admin/firestore";

export interface IncomingRequestsType {
    uid: string;
    name: string;
    approverEmail: string;
    dateEnd: Timestamp;
    dateStart: Timestamp;
    requestedByEmail: string;
    totalDays: number;
    typeOfLeave: string;
    holidayTabColour: string;
}
