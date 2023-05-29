export default interface FetchedUserType {
    uid: string;
    name: string;
    email: string;
    admin: boolean;
    superAdmin: boolean;
    totalHolidays: number;
    nationalHolidays: string;
    remainingHolidays: number;
    takenHolidays: number;
    flexTime: number;
    profilePic: string;
    profilePicDownloadURL?: string;
    managersEmail: string;
}
