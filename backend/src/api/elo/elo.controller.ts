import { NextFunction, Request, Response } from "express";
import { getRankFromElo } from "./elo.service";
import { use } from "passport";

export const getRank = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userElo = req.user?.elo;

        if (userElo == null) {
            res.status(400).json({ message: 'Elo score not found.' });
            return;
        }

        const userRank = await getRankFromElo(userElo);

        res.status(200).json(userRank);
    } catch (err) {
        next(err);
    }
}