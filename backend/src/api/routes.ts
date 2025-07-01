import { Router } from 'express';
import verificationRouter from './email-verification/verify.router';
import authRouter from './auth/auth.router';

const router = Router();

router.use('/verification', verificationRouter);
router.use(authRouter);

export default router;