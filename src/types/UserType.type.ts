export interface UserType {
    uid: string;
    name: string;
    admin: boolean;
    superAdmin: boolean;
    nationalHolidays: number;
    remainingHolidays: number;
    takenHolidays: number;
    flexTime: number;
}
