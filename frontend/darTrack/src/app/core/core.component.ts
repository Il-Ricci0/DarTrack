import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TopnavComponent } from "../topnav/topnav.component";

@Component({
    templateUrl: 'core.component.html',
    styleUrl: 'core.component.scss',
    imports: [RouterOutlet, TopnavComponent]
})
export class CoreComponent {
}