import { Timestamp } from "firebase-admin/firestore";

export interface IncomingRequestsType {
    approver: string;
    dateEnd: Timestamp;
    dateStart: Timestamp;
    requestedBy: string;
    totalDays: number;
}
