import { nanoid } from "nanoid";
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
    // funzione create casual game
    async create(gameOptions: CasualGame, creatorUserId: string): Promise<CasualGame> {
        if (!gameOptions.maxPlayers || gameOptions.maxPlayers > 8) {
            throw new MaxPlayersError();
        }

        // Inserisco il creatore nella partita
        if (!gameOptions.players.includes(creatorUserId)) {
            gameOptions.players.push(creatorUserId);
        }

        if (!gameOptions.players) {
            throw new MissingPlayersError();
        }

        // genero il codice invito
        let code: string;
        do {
            code = nanoid(6);
        } while (await CasualGameModel.findOne({ inviteCode: code }));

        gameOptions.inviteCode = code;

        // Setto i playerPoints a 0 di default quando creao il game
        gameOptions.playerPoints = new Map();
        gameOptions.players.forEach(playerId => {
            gameOptions.playerPoints.set(playerId, 0);
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

    // funzione per dare il ruolo di host al creatore del game
    async giveHost(userId: string): Promise<User> {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        user.role = UserRole.HOST;
        await user.save(); // salvo la modifica del ruolo

        return user;
    }

    // funzione che restituisce la lista di game a cui un giocatore fa parte (solo quelli creati o startati)
    async gameList(userId: string): Promise<CasualGame[]> {
        const games = await CasualGameModel.find({ players: userId, status: { $in: [GameStatus.Created, GameStatus.Started ]} }).populate('players');
        return games;
    }

    async gamesEnded(userId: string): Promise<CasualGame[]> {
        const gamesCompleted = await CasualGameModel.find({ players: userId, status: GameStatus.Completed }).populate('players');

        return gamesCompleted;
    }

    async joinGame(code: string, userId: string): Promise<CasualGame> {
        const game = await CasualGameModel.findOne({ inviteCode: code });

        if (!game) {
            throw new Error('Game with this invite code does not exist.');
        }

        if (game.status !== GameStatus.Created) {
            throw new Error('Cannot join a game that is not in CREATED state.');
        }

        if (game.players.includes(userId)) {
            throw new Error('You are already a participant in this game.');
        }

        if (game.players.length >= game.maxPlayers!) {
            throw new Error('The game has already reached the maximum number of players.');
        }

        // Aggiungo l'utente
        game.players.push(userId);
        game.playerPoints.set(userId, 0);

        await game.save();

        // restituisco con i player popolati
        const updatedGame = await CasualGameModel.findById(game._id).populate('players').exec();

        return updatedGame!;
    }
}

export default new CasualGameService();