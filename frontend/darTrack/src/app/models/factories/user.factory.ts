import { User } from "../user.model";

export class UserFactory {

    public fromJson = (json: any): User => ({
        firstName: json?.firstName,
        lastName: json?.lastName,
        email: json?.email,
        role: json?.role,
        active: json?.active,
        verificationToken: json?.verificationToken, 
        verificationTokenExpires: json?.verificationTokenExpires ? new Date(json.verificationTokenExpires) : null
    }); 

    public toJson = (user: User): any => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        active: user.active,
        verificationToken: user.verificationToken, 
        verificationTokenExpires: user.verificationTokenExpires ? user.verificationTokenExpires.toISOString() : null
    });
}