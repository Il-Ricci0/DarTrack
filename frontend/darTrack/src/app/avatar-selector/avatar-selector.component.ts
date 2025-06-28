import { AfterViewInit, Component, effect, input, model, signal } from "@angular/core";

@Component({
    templateUrl: 'avatar-selector.component.html',
    styleUrl: 'avatar-selector.component.scss',
    selector: 'avatar-selector'
})
export class AvatarSelectorComponent implements AfterViewInit {

    selected = model<number>();
    selected$ = signal<number | null>(null);
    selecting$ = signal(false);
    ready$ = signal(false);
    
    readonly = input(false);

    private syncing = false;

    constructor() {
        effect(() => {
            if (this.syncing)
                return;

            const selected = this.selected();
            if (selected != null && selected !== this.selected$()) {
                this.syncing = true;
                this.selected$.set(selected);
                queueMicrotask(() => (this.syncing = false));
            }
        });

        effect(() => {
            if (this.syncing)
                return;

            const selected = this.selected$();
            if (selected != null && selected !== this.selected()) {
                this.syncing = true;
                this.selected.set(selected);
                queueMicrotask(() => (this.syncing = false));
            }
        });
    }

    ngAfterViewInit(): void {
        this.ready$.set(true);
    }
}