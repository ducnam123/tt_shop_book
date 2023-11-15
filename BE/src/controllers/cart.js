import Cart from "../models/cart";
import User from "../models/auth.js";
import Book from '../models/books.js'
import Payment from '../models/payment.js'

export const getCartByUser = async (req, res) => {
  try {
    const cartId = req.user.cart;

    const cart = await Cart.findById(cartId).populate("products.product");

    return res.status(200).json({
      message: "Thông tin giỏ hàng",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  const cartId = req.body.cartId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: "Không tìm thấy giỏ hàng",
      });
    }

    const cartItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }

    cartItem.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      message: "Cập nhật thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};


// FIXME controllers giỏ hàng
//! Thêm sản phẩm vào giỏ hàng
// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity || 1;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra xem người dùng đã có giỏ hàng chưa, nếu không, tạo mới
    if (!user.cart) {
      const cart = await Cart.create({ user: userId, items: [] });
      user.cart = cart._id;
      await user.save();
    }

    // Thêm sản phẩm vào giỏ hàng
    const cart = await Cart.findById(user.cart);
    cart.items.push({ product: productId, quantity: quantity });
    await cart.save();

    return res.status(200).json({ message: "Thêm vào giỏ hàng thành công", cart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};









// Hàm lấy giá sản phẩm (đây chỉ là một hàm mẫu, bạn cần thay thế bằng cách lấy giá từ mô hình sản phẩm thực tế)
const getItemPrice = async (BookId) => {
  try {
    const product = await Book.findById(BookId); // Thay "Book" bằng tên mô hình sản phẩm của bạn
    if (!product || typeof product.price !== 'number' || isNaN(product.price)) {
      console.error(`Invalid product or price for product ${product}`);
      return 0; // hoặc giá trị mặc định nếu không có giá trị hợp lệ
    }
    return product.price;
  } catch (error) {
    console.error("Error getting item price:", error);
    return 0;
  }
};

// Hàm tính tổng số tiền từ giỏ hàng
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => {
    return total + item.quantity * getItemPrice("654f80b012e4382824734a98"); // Thay hàm getItemPrice bằng hàm lấy giá sản phẩm từ mô hình sản phẩm của bạn
  }, 0);
};

// Thanh toán
export const checkout = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    if (!user.cart) {
      return res.status(400).json({ message: "Giỏ hàng trống rỗng" });
    }

    // Lấy thông tin giỏ hàng
    const cart = await Cart.findById(user.cart);

    // Kiểm tra xem giỏ hàng có tồn tại và có thuộc tính 'items' không
    if (!cart || !cart.items) {
      return res.status(400).json({ message: "Giỏ hàng không hợp lệ" });
    }

    // Tạo thanh toán
    const payment = await Payment.create({
      user: userId,
      amount: calculateTotalAmount(cart.items), // Tính tổng số tiền dựa trên giỏ hàng
      items: cart.items,
    });

    // Cập nhật giỏ hàng và thanh toán cho người dùng
    user.cart = null;
    user.payments.push(payment._id);
    await user.save();

    // Xóa giỏ hàng
    await Cart.findByIdAndRemove(cart._id);

    return res.status(200).json({ message: "Thanh toán thành công" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

