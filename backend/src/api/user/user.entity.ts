import { UserRole } from '../utils/enum/user.role';

export type User = {
    id?: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    elo: number;
    rank: string;
    active: boolean;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}