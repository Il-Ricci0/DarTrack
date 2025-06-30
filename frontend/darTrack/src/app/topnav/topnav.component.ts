import { AfterViewInit, Component, inject, signal, ViewChild } from "@angular/core";
import { AvatarSelectorComponent } from "../avatar-selector/avatar-selector.component";
import { AuthService } from "../services/auth.service";
import { TopnavService } from "../services/topnav.service";

@Component({
    selector: 'topnav',
    templateUrl: 'topnav.component.html',
    styleUrl: 'topnav.component.scss',
    imports: [AvatarSelectorComponent]
})
export class TopnavComponent implements AfterViewInit {

    showMenu$ = signal(false);
    ready$ = signal(false);
    authService = inject(AuthService);
    topnavService = inject(TopnavService);

    ngAfterViewInit(): void {
        this.ready$.set(true);
    }

    toggleMenu() {
        this.showMenu$.update(x => !x);
    }
}