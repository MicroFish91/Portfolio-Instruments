import express from "express";
import { requireJwt } from "../../auth";
import { deleteOne } from "./deleteOne";
import { getAll } from "./getAll";
import { getLatest } from "./getLatest";
import { getRange } from "./getRange";
import { postOne } from "./postOne";

const router = express.Router();

router.get("/latest", requireJwt, getLatest);
router.get("/range/:years", requireJwt, getRange);
router.get("/all", requireJwt, getAll);
router.post("/", requireJwt, postOne);
router.delete("/", requireJwt, deleteOne);

export default router;
