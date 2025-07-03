import { NextFunction, Request, Response } from "express";
import CasualGameSrv, { isPlayerHost } from './casual.service';
import { CasualGameModel } from "./casual.model";

export const createCasualGame = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const gameSettings = req.body;
        const creatorId = req.user?.id;

        if (!creatorId) {
            res.status(401).json({ message: 'Game creator information is missing or user is not authenticated.' })
            return;
        }

        if (!gameSettings) {
            res.status(400).json({ message: 'Game settings missing.' });
            return;
        }

        const game = await CasualGameSrv.create(gameSettings, creatorId);

        if (!game) {
            res.status(400).json({ message: 'Invalid game parameters.' });
            return;
        }

        res.status(201).json(game);
    } catch (err) {
        next(err);
    }
}

export const getMyGames = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'User information is missing or user is not authenticated.' });
            return;
        }

        const gamesList = await CasualGameSrv.gameList(userId);

        if (!gamesList) {
            res.status(500).json({ message: 'Unable to retrieve your games list.' });
            return;
        }

        if (gamesList.length === 0) {
            res.status(200).json({ message: 'You have no active games.', data: [] });
            return;
        }

        res.status(200).json(gamesList);
    } catch (err) {
        next(err);
    }
}

export const myMatchHistory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'User information is missing or user is not authenticated.' });
            return;
        }

        const matchHistory = await CasualGameSrv.gamesEnded(userId);

        if (!matchHistory) {
            res.status(500).json({ message: 'Unable to retrieve your match history.' });
            return;
        }

        if (matchHistory.length === 0) {
            res.status(200).json({ message: 'Your match history is empty.', data: [] });
            return;
        }

        res.status(200).json(matchHistory);
    } catch (err) {
        next(err);
    }
}

export const joinGameViaCode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { code } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: 'User information is missing or user is not authenticated.' });
            return;
        }

        if (!code || typeof code !== 'string') {
            res.status(400).json({ message: 'Invite code is missing or invalid.' });
            return;
        }

        const joinedGame = await CasualGameSrv.joinGame(code, userId!);

        if (!joinedGame) {
            res.status(500).json({ message: 'Failed to join the game. Please try again later.' });
            return;
        }

        res.status(200).json({ message: 'Successfully joined the game.', game: joinedGame })
    } catch (err) {
        next(err);
    }
}

export const startTheGame = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const gameId = req.params.gameId;
        const user = req.user;

        if (!gameId) {
            res.status(400).json({ message: 'Game ID is missing in the URL.' });
            return;
        }

        if (!user || !user.id) {
            res.status(401).json({ message: 'User not authenticated.' });
            return;
        }

        const game = await CasualGameModel.findById(gameId).populate('players.userId').exec();

        if (!game) {
            res.status(404).json({ message: `Game with ID ${gameId} not found.` });
            return;
        }

        if (!isPlayerHost(game, user.id)) {
            res.status(403).json({ message: 'Only the host can start the game.' });
            return;
        }

        const updatedGame = await CasualGameSrv.startGame(gameId);

        res.status(200).json(updatedGame);
    } catch (err) {
        next(err);
    }
}