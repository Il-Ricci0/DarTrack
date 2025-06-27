import { UserRole } from '../utils/enum/user.role';

export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    active: boolean;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}