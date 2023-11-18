import express from "express";
import { create, get, getAll, remove, update, searchBooks } from "../controllers/books";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();
router.get("/books", getAll);
router.get("/books/:id", get);
router.post("/books", checkPermission, create);
router.patch("/books/:id", checkPermission, update);
router.delete("/books/:id", checkPermission, remove);
router.get('/book/search', searchBooks);


export default router;