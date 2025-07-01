import { NextFunction, Request, Response } from "express";
import { cleanupUnverifiedUsers } from "./cleanup.service";

export const runCleanup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Protection via secret header
        const jobSecret = req.headers['x-job-secret'];

        // If secret does not match, block access
        if (jobSecret !== process.env.CLEANUP_SECRET) {
            res.status(403).json({ error: 'Unauthorized access.' });
            return;
        }

        // If secret is correct, run cleanup
        const deletedCount = await cleanupUnverifiedUsers();

        res.status(200).json({ message: `Cleanup completed. Users deleted: ${deletedCount}` });
    } catch (err) {
        console.log('Error occurred during user cleanup via API.');
        next(err);
        res.status(500).json({ error: 'Error occurred during user cleanup.' });
    }
}