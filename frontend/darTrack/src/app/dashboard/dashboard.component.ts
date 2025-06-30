import { Component, signal } from "@angular/core";
import { EGameContainerStatus } from "../models/enums/game-container-status.enum";
import { RouterLink } from "@angular/router";

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrl: 'dashboard.component.scss',
    imports: [RouterLink]
})
export class DashboardComponent {
    EGameContainerStatus = EGameContainerStatus;
    gameContainerStatus$ = signal(EGameContainerStatus.Hidden);

    onCasualClick() {
        this.gameContainerStatus$.update(x => x !== EGameContainerStatus.Casual ? EGameContainerStatus.Casual : EGameContainerStatus.Hidden);
    }

    onTournamentClick() {
        this.gameContainerStatus$.update(x => x !== EGameContainerStatus.Tournament ? EGameContainerStatus.Tournament : EGameContainerStatus.Hidden);
    }
}