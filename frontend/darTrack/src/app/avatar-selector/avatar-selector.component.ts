import { Component, signal, WritableSignal } from "@angular/core";

@Component({
    templateUrl: 'avatar-selector.component.html',
    styleUrl: 'avatar-selector.component.scss',
    selector: 'avatar-selector'
})
export class AvatarSelectorComponent {
    selected$ = signal(Math.floor(Math.random() * 6) + 1);
    selecting$ = signal(false);
}