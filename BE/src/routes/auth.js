import express from "express";
import { signin, signup, getUser, removeUser, editUser, getUsers } from "../controllers/auth";
const router = express.Router();


router.get("/users", getUser)
router.delete("/users/:id", removeUser)
router.patch("/users/:id", editUser)
router.get("/users/:id", getUsers)
router.post("/signup", signup);
router.post("/signin", signin);

export default router;