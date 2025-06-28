import { AfterViewInit, Component, signal } from "@angular/core";
import { AvatarSelectorComponent } from "../avatar-selector/avatar-selector.component";

@Component({
    selector: 'topnav',
    templateUrl: 'topnav.component.html',
    styleUrl: 'topnav.component.scss',
    imports: [AvatarSelectorComponent]
})
export class TopnavComponent implements AfterViewInit {

    showMenu$ = signal(false);
    ready$ = signal(false);

    ngAfterViewInit(): void {
        this.ready$.set(true);
    }

    toggleMenu() {
        this.showMenu$.update(x => !x);
    }
}