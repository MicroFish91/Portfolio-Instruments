import express from "express";
import { asyncMiddleware, requireJwt } from "../../middleware";
import { deleteOne } from "./deleteOne";
import { getAll } from "./getAll";
import { getLatest } from "./getLatest";
import { getRange } from "./getRange";
import { postOne } from "./postOne";

const router = express.Router();

router.get("/latest", requireJwt, asyncMiddleware(getLatest));
router.get("/range/:years", requireJwt, asyncMiddleware(getRange));
router.get("/all", requireJwt, asyncMiddleware(getAll));
router.post("/", requireJwt, postOne);
router.delete("/", requireJwt, asyncMiddleware(deleteOne));

export default router;
