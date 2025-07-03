import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AvatarSelectorComponent } from "../../avatar-selector/avatar-selector.component";
import { FormsModule } from "@angular/forms";
import { SignupPayload } from "../../models/dtos/signup-payload.model";
import { AuthService } from "../../services/auth.service";

@Component({
    templateUrl: 'signup.component.html',
    styleUrl: 'signup.component.scss',
    imports: [RouterLink, AvatarSelectorComponent, FormsModule]
})
export class SignupComponent {

    signup = new SignupPayload();
    password1 = '';

    authService = inject(AuthService);

    async commit() {
        try {
            await this.authService.signup(this.signup);
        } catch (err: any) {
            console.error(err);
        }
    }
}