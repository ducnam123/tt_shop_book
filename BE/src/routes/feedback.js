import express from "express";
import { create, getAll, remove, update, getOne } from "../controllers/feedback";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.delete("/:id", remove);
router.patch("/:id", update);

export default router;