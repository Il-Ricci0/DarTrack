import { GameStatus } from "../../utils/enum/game.status";

export type CasualGame = {
    id?: string;
    players: string[]; // array di ID o nomi dei giocatori
    maxPlayers?: number;
    createdAt: Date;
    status: GameStatus;
    playerPoints: { [playerId: string]: number };
}