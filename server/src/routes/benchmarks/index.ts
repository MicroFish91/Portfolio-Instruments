import express from "express";
import { asyncMiddleware, requireJwt } from "../../middleware";
import { getBenchmark } from "./getBenchmark";
import { getCustom } from "./getCustom";
import { postBenchmark } from "./postBenchmark";
import { postCustom } from "./postCustom";

const router = express.Router();

router.get("/", requireJwt, asyncMiddleware(getBenchmark));
router.get("/custom", requireJwt, asyncMiddleware(getCustom));
router.post("/", requireJwt, asyncMiddleware(postBenchmark));
router.post("/custom", requireJwt, asyncMiddleware(postCustom));

export default router;
