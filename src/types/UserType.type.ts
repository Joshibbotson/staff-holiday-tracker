export interface UserType {
    uid: string;
    name: string;
    email: string;
    admin: boolean;
    superAdmin: boolean;
    nationalHolidays: number;
    remainingHolidays: number;
    takenHolidays: number;
    flexTime: number;
    profilePic: string;
}
