import { Injectable, signal } from "@angular/core";

@Injectable()
export class TopnavService {
    renderHeader$ = signal(true);
}
