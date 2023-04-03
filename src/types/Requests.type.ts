import { Timestamp } from "firebase-admin/firestore";

export interface RequestsType {
    approver: string;
    dateEnd: Timestamp;
    dateStart: Timestamp;
    requestedBy: string;
    totalDays: number;
}
