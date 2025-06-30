import { AfterViewInit, Component, effect, inject, input, model, signal } from "@angular/core";
import { TopnavService } from "../services/topnav.service";

@Component({
    templateUrl: 'avatar-selector.component.html',
    styleUrl: 'avatar-selector.component.scss',
    selector: 'avatar-selector'
})
export class AvatarSelectorComponent implements AfterViewInit {

    readonly = input(false);
    selected = model<number | null>();
    selected$ = signal<number | null>(null);
    selecting$ = signal(false);
    ready$ = signal(false);

    private syncing = false;

    topnavService = inject(TopnavService);

    constructor() {

        effect(() => {
            const selecting = this.selecting$();
            this.topnavService.renderHeader$.set(!selecting);
        });

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