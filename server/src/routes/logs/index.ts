import express from "express";
import { asyncMiddleware, requireJwt } from "../../middleware";
import { getLogs } from "./getLogs";

const router = express.Router();

router.get("/", requireJwt, asyncMiddleware(getLogs));

export default router;
