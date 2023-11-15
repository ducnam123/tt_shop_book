import express from "express";

import { create, remove, update, getCardByUser } from "../controllers/card";
// import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", getCardByUser);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);

export default router;