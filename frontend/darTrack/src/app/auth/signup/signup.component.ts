import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AvatarSelectorComponent } from "../../avatar-selector/avatar-selector.component";

@Component({
    templateUrl: 'signup.component.html',
    styleUrl: 'signup.component.scss',
    imports: [RouterLink, AvatarSelectorComponent]
})
export class SignupComponent {

    random: number = Math.floor(Math.random() * 5) + 1;

}