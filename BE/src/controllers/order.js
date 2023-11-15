import Order from "../models/order";
import User from "../models/auth";
import Voucher from "../models/voucher";
import Cart from "../models/cart";

import { orderSchema } from "../schemas/order";

const getAll = async (req, res) => {
  try {
    const data = await Order.find();

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Thông tin các đơn hàng",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await Order.findById(req.params.id).populate("vouchers");

    if (!data || !data.length === 0) {
      return res.status(404).json({
        message: "Không có thông tin",
      });
    }

    return res.status(200).json({
      message: "Thông tin đơn hàng",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra " + err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { error: validationError } = orderSchema.validate(req.body, {
      abortEarly: false,
    });
    if (validationError) {
      return res.status(400).json({
        message: validationError.details.map((err) => err.message),
      });
    }

    const userCart = await Cart.findById(req.user.cart);
    if (!userCart) {
      return res.status(404).json({
        message: "Chưa có giỏ hàng",
      });
    }

    const orderStatus =
      req.body.paymentMethod === "Thanh toán bằng thẻ"
        ? "Chờ thanh toán"
        : "Đang xử lý";

    const cartProducts = userCart.products;
    const userId = req.user._id;
    const orderData = {
      ...req.body,
      products: cartProducts,
      user: userId,
      status: orderStatus,
    };

    const createdOrder = await Order.create(orderData);
    if (!createdOrder) {
      return res.status(404).json({
        message: "Tạo đơn hàng thất bại",
      });
    }

    if (req.body.vouchers && req.body.vouchers.length > 0) {
      const voucherIds = req.body.vouchers;

      const updateVoucher = async (voucherId) => {
        const voucher = await Voucher.findById(voucherId);
        if (!voucher) {
          return res.status(404).json({
            message: "Voucher không tồn tại",
          });
        }

        voucher.limit -= 1;
        await voucher.save();
      };

      await Promise.all(voucherIds.map(updateVoucher));
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: { orders: createdOrder._id, vouchers: req.body.vouchers },
        cart: null,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }

    const deletedCart = await Cart.findByIdAndRemove(req.user.cart);
    if (!deletedCart) {
      return res.status(404).json({
        message: "Không thể xóa giỏ hàng",
      });
    }

    return res.status(201).json({
      message: "Tạo đơn hàng thành công",
      order: createdOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra " + err.message,
    });
  }
};

const edit = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    order.status = req.body.status;
    await order.save();

    return res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const del = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    await order.remove();

    return res.status(200).json({
      message: "Xóa đơn hàng thành công",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const findOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "Người dùng không có đơn hàng",
      });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Lỗi truy vấn:", err);

    res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình tìm đơn hàng.",
    });
  }
};

export { getAll, getOne, edit, create, del, findOrdersByUserId };