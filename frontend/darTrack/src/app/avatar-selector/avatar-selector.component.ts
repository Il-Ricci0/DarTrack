import { AfterViewInit, Component, signal } from "@angular/core";

@Component({
    templateUrl: 'avatar-selector.component.html',
    styleUrl: 'avatar-selector.component.scss',
    selector: 'avatar-selector'
})
export class AvatarSelectorComponent implements AfterViewInit {

    selected$ = signal(Math.floor(Math.random() * 6) + 1);
    selecting$ = signal(false);
    ready$ = signal(false);

    ngAfterViewInit(): void {
        this.ready$.set(true);
    }
}