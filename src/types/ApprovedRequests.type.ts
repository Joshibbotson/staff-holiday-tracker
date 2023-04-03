import { Timestamp } from "firebase-admin/firestore";

export interface ApprovedRequestsType {
    approvedBy: string;
    dateEnd: Timestamp;
    dateStart: Timestamp;
    requestedBy: string;
    totalDays: number;
}
