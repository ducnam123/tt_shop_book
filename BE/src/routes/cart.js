import express from "express";

import { getCartByUser, updateCart, checkout, addToCart } from "../controllers/cart";

// import { loginMiddleware } from "../middleware/loginPermission";

const router = express.Router();

router.get("/cart", getCartByUser);
router.patch("/cart", updateCart);

// test giỏ hàng
router.post("/cartcheck", checkout);
router.post("/addtocart", addToCart);

export default router;