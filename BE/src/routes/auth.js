import express from "express";
import {
  signin, signup, getUser, removeUser, editUser, getUsers,
  getSecurityCode, verify, resetPassword, getCode,
  changePassword,
  checkCode
} from "../controllers/auth";
import { loginMiddleware } from '../middlewares/loginPermission'


const router = express.Router();
router.get("/users", getUser)
router.delete("/users/:id", removeUser)
router.patch("/users/:id", editUser)
router.get("/users/:id", getUsers)
router.post("/signup", signup);
router.post("/signin", signin);

// !
router.post("/verify", verify);
router.post("/forgot-password", getSecurityCode);
router.post("/reset-password", resetPassword);
router.post("/send-code", getCode);
router.post("/check-code", loginMiddleware, checkCode);
router.post("/change-pass", changePassword);

export default router;

