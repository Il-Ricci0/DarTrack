import { Router } from "express";
import { createCasualGame, getMyGames, myMatchHistory } from "./casual.controller";
import { isAuthenticated } from "../../../lib/auth/auth.middlerware";

const router = Router();

router.use(isAuthenticated);
router.post('/creategame', createCasualGame);
router.get('/mygames', getMyGames);
router.get('/matchHistory', myMatchHistory);

export default router;