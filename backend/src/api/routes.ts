import { Router } from 'express';
import verificationRouter from './email-verification/verify.router';
import authRouter from './auth/auth.router';
import cleanupRouter from './jobs/cleanup.router';

const router = Router();

router.use('/verification', verificationRouter);
router.use(authRouter);
router.use('/jobs', cleanupRouter);

export default router;