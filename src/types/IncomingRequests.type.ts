import { Timestamp } from "firebase-admin/firestore";

export interface IncomingRequestsType {
    approverEmail: string;
    dateEnd: Timestamp;
    dateStart: Timestamp;
    requestedByEmail: string;
    totalDays: number;
}
