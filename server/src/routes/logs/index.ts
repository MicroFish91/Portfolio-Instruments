import express from "express";
import { asyncMiddleware, requireJwt } from "../../middleware";
import { getLogs } from "./getLogs";
import { getRecordsJson } from "./getRecordsJson";

const router = express.Router();

router.get("/", requireJwt, asyncMiddleware(getLogs));
router.get("/records/json/:years", requireJwt, asyncMiddleware(getRecordsJson));

export default router;
