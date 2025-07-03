import { Router } from "express";
import { createCasualGame } from "./casual.controller";
import { isAuthenticated } from "../../../lib/auth/auth.middlerware";

const router = Router();

router.use(isAuthenticated);
router.post('/creategame', createCasualGame);

export default router;