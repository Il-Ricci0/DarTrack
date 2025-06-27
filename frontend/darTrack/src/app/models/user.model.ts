import { EUserRole } from "./enums/user.enum";

export class User {
    firstName!: string | null;
    lastName!: string | null;
    email!: string | null;
    role!: EUserRole | null;
    active!: boolean | null;
    verificationToken!: string | null;
    verificationTokenExpires!: Date | null;
}