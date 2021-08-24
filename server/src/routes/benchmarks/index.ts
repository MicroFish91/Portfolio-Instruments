import express from "express";
import { asyncMiddleware, requireJwt } from "../../middleware";
import { getBenchmark } from "./getBenchmark";
import { postBenchmark } from "./postBenchmark";

const router = express.Router();

router.get("/", requireJwt, asyncMiddleware(getBenchmark));
router.post("/", requireJwt, asyncMiddleware(postBenchmark));

export default router;
