import { Router } from 'express';
import verificationRouter from './email-verification/verify.router';
import authRouter from './auth/auth.router';
import cleanupRouter from './jobs/cleanup.router';
import eloRouter from './elo/elo.router';
import userRouter from './user/user.router';

const router = Router();

router.use('/verification', verificationRouter);
router.use(authRouter);
router.use('/jobs', cleanupRouter);
router.use('/elo', eloRouter);
router.use('/user', userRouter);

export default router;