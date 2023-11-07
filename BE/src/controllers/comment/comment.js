import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Comment from "../../models/comment/comment";
import User from "../../models/user/auth";
import Product from "../../models/product/books";

import { commentSchema } from "../validators/comment";

dotenv.config();

export const getAll = async (req, res) => {
  try {
    const data = await Comment.find().populate("User").populate("feed_back");

    if (!data || data.length === 0) {
      return res.status(200).json({
        message: "Không có danh sách",
      });
    }

    return res.status(200).json({
      message: "Danh sách bình luận",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Lỗi khi lấy danh sách bình luận",
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = commentSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const newComment = await Comment.create({
      ...req.body,
      user: req.user._id,
      comment: req.body.comment,
    });

    await Product.findByIdAndUpdate(
      req.body.product,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    return res.status(201).json({
      message: "Thêm bình luận thành công",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi bình luận",
    });
  }
};

export const update = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Bình luận không tồn tại",
      });
    }

    if (comment.user._id != decoded.id) {
      return res.status(403).json({
        message: "Bạn không có quyền cập nhật bình luận này",
      });
    }

    const updatedComment = {
      ...req.body,
    };

    const data = await Comment.findByIdAndUpdate(
      req.params.id,
      updatedComment,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        message: "Cập nhật bình luận không thành công",
      });
    }

    return res.status(200).json({
      message: "Cập nhật bình luận thành công",
      data: data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi cập nhật bình luận " + error.message,
    });
  }
};

export const del = async (req, res) => {
  try {
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId);

    if (comment && comment.user.toString() === req.user._id.toString()) {
      await Comment.findByIdAndDelete(commentId);

      await User.updateMany(
        { comments: commentId },
        { $pull: { comments: commentId } }
      );

      await Product.updateMany(
        { comments: commentId },
        { $pull: { comments: commentId } }
      );

      return res.status(200).json({
        message: "Bình luận đã được xóa thành công",
      });
    } else {
      return res.status(403).json({
        message: "Bạn không có quyền xóa bình luận này",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi cập nhật bình luận " + error.message,
    });
  }
};

export const getOne = (req, res) => { };
