export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'host' | 'player';
    active: boolean;
    verificationToken?: string;
    verificationTokenExpires?: Date;
}