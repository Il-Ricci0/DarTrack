import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { SignupPayload } from "../../models/dtos/signup-payload.model";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { SigninResponse } from "../../models/dtos/signin-response.model";

@Component({
    templateUrl: 'signin.component.html',
    styleUrl: 'signin.component.scss',
    imports: [RouterLink, FormsModule]
})
export class SigninComponent {

    signin = new SignupPayload();

    authService = inject(AuthService);

    async commit() {
        try {
            const res: SigninResponse = await this.authService.signin(this.signin);
            this.authService.user$.set(res.user);
            this.authService.storeAccessToken(res.token);
            this.authService.storeRefreshToken(res.refreshToken);

        } catch (err: any) {
            console.error(err);
        }
    }
}