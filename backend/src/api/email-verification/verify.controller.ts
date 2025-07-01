import { NextFunction, Request, Response } from "express";
import { verifyEmailToken } from "./verify.service";

export const verifyEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { token } = req.query;

        if (typeof token !== 'string' || token.length < 10) {
            res.status(400).json({ message: 'Invalid verification token.' })
        }

        const user = await verifyEmailToken(token as string);

        if (!user) {
            res.status(400).json({ message: 'Token is invalid or expired.' });
            return;
        }

        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (err) {
        next(err);
    }
}