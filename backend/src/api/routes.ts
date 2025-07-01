import { Router } from 'express';
import verificationRouter from './email-verification/verify.router';

const router = Router();

router.use('/verification', verificationRouter);

export default router;