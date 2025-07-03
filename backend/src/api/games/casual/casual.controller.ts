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