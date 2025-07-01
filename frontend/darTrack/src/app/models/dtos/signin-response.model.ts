import { User } from "../user.model";

export class SigninResponse {
    user!: User;
    token!: string;
    refreshToken!:string;
}