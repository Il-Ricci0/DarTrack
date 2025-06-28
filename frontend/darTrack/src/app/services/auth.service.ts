import { Injectable, signal } from "@angular/core";
import { User } from "../models/user.model";
import { UserFactory } from "../models/factories/user.factory";

@Injectable()
export class AuthService {

    readonly ACCESS_TOKEN_KEY = 'access_token';

    user$ = signal<User | null>(UserFactory.fromJson({
        username: 'sissiogamer89',
        avatarId:1 
    }));

    storeAccessToken = (accessToken: string) =>
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)

    retrieveAccessToken = () =>
        localStorage.getItem(this.ACCESS_TOKEN_KEY)

    clearAccessToken = () =>
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
}