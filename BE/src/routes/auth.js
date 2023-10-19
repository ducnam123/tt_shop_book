import express from "express";
import { signin, signup, getUser } from "../controllers/auth";
const router = express.Router();


router.get("/users", getUser)
router.post("/signup", signup);
router.post("/signin", signin);

export default router;