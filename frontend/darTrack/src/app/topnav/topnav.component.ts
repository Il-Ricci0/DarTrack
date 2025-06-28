import { Component } from "@angular/core";
import { AvatarSelectorComponent } from "../avatar-selector/avatar-selector.component";

@Component({
    selector: 'topnav',
    templateUrl: 'topnav.component.html',
    styleUrl: 'topnav.component.scss',
    imports: [AvatarSelectorComponent]
})
export class TopnavComponent {
}