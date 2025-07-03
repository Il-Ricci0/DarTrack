import { NextFunction, Request, Response } from "express";
import CasualGameSrv from './casual.service';

export const createCasualGame = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const gameSettings = req.body;
        const creatorId = req.user?.id;

        if (!creatorId) {
            res.status(400).json({ message: 'Game creator information is missing or user is not authenticated.' })
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
            res.status(400).json({ message: 'User information is missing or user is not authenticated.' });
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
            res.status(400).json({ message: 'User information is missing or user is not authenticated.' });
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