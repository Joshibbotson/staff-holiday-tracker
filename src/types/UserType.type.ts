export interface UserType {
    uid: string;
    name: string;
    email: string;
    admin: boolean;
    superAdmin: boolean;
    nationalHolidays: string;
    totalHolidays: number;
    remainingHolidays: number;
    takenHolidays: number;
    flexTime: number;
    profilePic: string;
    profilePicDownloadURL: string;
    managersEmail: string;
    holidayTabColour: string;
}
