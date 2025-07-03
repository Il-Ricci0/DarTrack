import { Router } from "express";
import { createCasualGame, getMyGames, joinGameViaCode, myMatchHistory } from "./casual.controller";
import { isAuthenticated } from "../../../lib/auth/auth.middlerware";

const router = Router();

router.use(isAuthenticated);
router.post('/createGame', createCasualGame);
router.get('/myGames', getMyGames);
router.get('/matchHistory', myMatchHistory);
router.patch('/joinGame', joinGameViaCode);

export default router;