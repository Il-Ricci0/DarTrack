import { User } from "../user.model";

export class UserFactory {

    public static fromJson = (json: any): User => ({
        username: json?.username,
        email: json?.email,
        role: json?.role,
        active: json?.active,
        avatarId: json?.avatarId,
        verificationToken: json?.verificationToken, 
        verificationTokenExpires: json?.verificationTokenExpires ? new Date(json.verificationTokenExpires) : null
    }); 

    public static toJson = (user: User): any => ({
        username: user.username,
        email: user.email,
        role: user.role,
        active: user.active,
        avatarId: user.avatarId,
        verificationToken: user.verificationToken, 
        verificationTokenExpires: user.verificationTokenExpires ? user.verificationTokenExpires.toISOString() : null
    });
}