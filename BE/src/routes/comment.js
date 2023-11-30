import express from "express";
import { create, getAll, update, del, getOne } from "../controllers/comment";

const router = express.Router();
router.get("/comment", getAll);
router.get("/comment/:id", getOne);
router.post("/comment", create);
router.patch("/comment/:id", update);
router.delete("/comment/:id", del);


export default router;