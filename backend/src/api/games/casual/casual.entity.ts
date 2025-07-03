import { GameStatus } from "../../utils/enum/game.status";
import { UserRole } from "../../utils/enum/user.role";

export type PlayerInfo = {
    userId: string;
    role: UserRole;
};

export type CasualGame = {
    id?: string;
    players: PlayerInfo[]; // array di oggetti child con userId e role
    maxPlayers?: number;
    createdAt: Date;
    status: GameStatus;
    playerPoints: Map<string, number>;
    inviteCode: string;
};