import express from "express";
import { favorite, getFavoriteByUser } from "../controllers/favorites";
import { loginMiddleware } from "../middlewares/loginPermission";
const router = express.Router();

router.post("/favorites/:id", loginMiddleware, favorite);
router.get("/favorites/", loginMiddleware, getFavoriteByUser);

export default router;