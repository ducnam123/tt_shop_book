import express from "express";
import { create, get, getAll, remove, update, caterogy } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", get);
router.get("/category/search", caterogy);
router.post("/categories", checkPermission, create);
router.patch("/categories/:id", checkPermission, update);
router.delete("/categories/:id", checkPermission, remove);

export default router;