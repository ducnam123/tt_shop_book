import dotenv from "dotenv";

import Card from "../models/card";
import User from "../models/auth";
import { cardSchema } from "../schemas/card";

dotenv.config();

export const create = async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const card = await Card.findOne({ card_number: req.body.card_number });
    if (card) {
      return res.status(409).json({
        message: "Thẻ ngân hàng đã tồn tại",
      });
    }

    const data = await Card.create(req.body);
    if (!data) {
      return res.status(500).json({
        message: "Không thêm được thẻ ngân hàng",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
      });
    }

    user.cards.push(data);
    await user.save();

    return res.status(200).json({
      message: "Thêm thẻ ngân hàng thành công",
      data: data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Card.findByIdAndDelete(req.params.id);

    await User.updateMany(
      { cards: req.params.id },
      { $pull: { cards: req.params.id } }
    );

    return res.status(200).json({
      message: "Xóa thẻ ngân hàng thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const card = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!card) {
      return res.status(404).json({
        message: "Cập nhật thẻ ngân hàng thất bại",
      });
    }

    return res.status(200).json({
      message: "Cập nhật thẻ ngân hàng thành công",
      data: card,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const getCardByUser = async (req, res) => {
  try {
    const cards = req.user.cards;

    const listCards = await Promise.all(cards.map((id) => Card.findById(id)));

    return res.status(200).json({
      message: "Danh sách thẻ ngân hàng",
      listCards,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};