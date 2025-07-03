import { User } from "../../user/user.entity";
import { UserModel } from "../../user/user.model";
import { GameStatus } from "../../utils/enum/game.status";
import { UserRole } from "../../utils/enum/user.role";
import { CasualGame } from "./casual.entity";
import { CasualGameModel } from "./casual.model";

export class MissingPlayersError extends Error {
    constructor() {
        super();
        this.name = 'MissingPlayersError';
        this.message = 'The number of players provided does not match the required maxPlayers.';
    }
}

export class MaxPlayersError extends Error {
    constructor() {
        super();
        this.name = 'MaxPlayersError';
        this.message = 'The maxPlayers value is invalid or exceeds the allowed limit of 8.';
    }
}

export class CasualGameService {
    async create(gameOptions: CasualGame, creatorUserId: string): Promise<CasualGame> {
        if (!gameOptions.maxPlayers || gameOptions.maxPlayers > 8) {
            throw new MaxPlayersError();
        }
        
        // Inserisco il creatore nella partita
        if (!gameOptions.players.includes(creatorUserId)) {
            gameOptions.players.push(creatorUserId);
        }

        if (!gameOptions.players || gameOptions.players.length !== gameOptions.maxPlayers) {
            throw new MissingPlayersError();
        }

        // Setto i playerPoints a 0 di default quando creao il game
        gameOptions.playerPoints = {};
        gameOptions.players.forEach(playerId => {
            gameOptions.playerPoints[playerId] = 0;
        });

        // Setto lo status della partita a CREATED
        gameOptions.status = GameStatus.Created;

        // Setto il date attuale (anche se lo fa già nel model di default)
        gameOptions.createdAt = new Date();

        // Salvataggio su MongoDB
        const newGameDoc = await CasualGameModel.create(gameOptions);

        // Do il ruolo HOST al creatore
        await this.giveHost(creatorUserId);

        // Recupero il game popolato
        const newGame = await CasualGameModel.findById(newGameDoc._id).populate('players').exec();
        return newGame!;
    }

    async giveHost(userId: string): Promise<User> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        user.role = UserRole.HOST;
        await user.save(); // salvo la modifica del ruolo

        return user;
    }

    async gameList(userId: string): Promise<CasualGame[]> {
        const games = await CasualGameModel.find({ players: userId });
        return games;
    }
}

export default new CasualGameService();