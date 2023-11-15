import express from "express";

import {
  create,
  del,
  edit,
  findOrdersByUserId,
  getAll,
  getOne,
} from "../controllers/order";


const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/user/:userId", findOrdersByUserId);
router.post("/", create);
router.put("/:id", edit);
router.delete("/:id", del);

export default router;