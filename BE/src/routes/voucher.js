import express from "express";
import { create, getAll, getOne, checkVoucher } from "../controllers/voucher";

// import { checkPermission } from "../middleware/checkPermission";
// import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.post("/check-voucher", checkVoucher);

export default router;