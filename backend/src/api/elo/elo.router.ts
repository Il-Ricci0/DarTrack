import { Router } from "express";
import { isAuthenticated } from "../../lib/auth/auth.middlerware";
import { getRank } from "./elo.controller";

const router = Router();

router.use(isAuthenticated);
router.get('/getRank', getRank);

export default router;