import { inject, Injectable, signal } from "@angular/core";
import { User } from "../models/user.model";
import { UserFactory } from "../models/factories/user.factory";
import { HttpClient } from "@angular/common/http";
import { SignupPayload } from "../models/dtos/signup-payload.model";
import { firstValueFrom } from "rxjs";
import { SigninPayload } from "../models/dtos/signin-payload.model";
import { SigninResponse } from "../models/dtos/signin-response.model";

@Injectable()
export class AuthService {

    readonly ACCESS_TOKEN_KEY = 'access_token';
    readonly REFRESH_TOKEN_KEY = 'refresh_token';

    httpClient = inject(HttpClient);

    user$ = signal<User | null>(UserFactory.fromJson({
        username: 'sissiogamer89',
        avatarId: 1
    }));

    storeAccessToken = (accessToken: string) =>
        localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken)

    retrieveAccessToken = () =>
        localStorage.getItem(this.ACCESS_TOKEN_KEY)

    clearAccessToken = () =>
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);

    storeRefreshToken = (refreshToken: string) =>
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)

    retrieveRefreshToken = () =>
        localStorage.getItem(this.REFRESH_TOKEN_KEY)

    clearRefreshToken = () =>
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);

    async signup(payload: SignupPayload): Promise<void> {
        const req = this.httpClient.post<void>('/api/register', payload);
        await firstValueFrom(req);
    }

    async signin(payload: SigninPayload): Promise<SigninResponse> {
        const req = this.httpClient.post<SigninResponse>('/api/login', payload);
        return await firstValueFrom<SigninResponse>(req);
    }
}