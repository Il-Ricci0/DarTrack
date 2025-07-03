import { Router } from "express";
import { createCasualGame, getMyGames, joinGameViaCode, myMatchHistory, startTheGame } from "./casual.controller";
import { isAuthenticated } from "../../../lib/auth/auth.middlerware";

const router = Router();

router.use(isAuthenticated);
router.post('/createGame', createCasualGame);
router.get('/myGames', getMyGames);
router.get('/matchHistory', myMatchHistory);
router.patch('/joinGame', joinGameViaCode);
router.patch('/:gameId/gameStart', startTheGame);

export default router;