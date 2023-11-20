import Feedback from "../models/feedBack";
import User from "../models/auth";
import Comment from "../models/comment";

export const getAll = async (req, res) => {
  try {
    const data = await Feedback.find().populate("User");

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "không có danh sách",
      });
    }

    return res.status(200).json({
      message: "Danh sách phản hồi",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await Feedback.find().populate("user");

    if (!data) {
      return res.status(404).json({
        message: "Không có phản hồi",
      });
    }

    return res.status(200).json({
      message: "Thông tin phản hồi",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const checkComment = await Comment.findById(req.body.commentId);
    if (!checkComment) {
      return res.status(400).json({
        message: "Bình luận không tồn tại",
      });
    }

    const data = await Feedback.create({
      user: user._id,
      ...req.body,
    });

    if (!data) {
      return res.status(404).json({
        message: "Phản hồi thất bại",
      });
    }

    await Comment.findByIdAndUpdate(
      req.body.commentId,
      { $push: { feed_back: data._id } },
      { new: true }
    );

    return res.status(200).json({
      message: "Phản hồi thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const feed_back = await Feedback.findById(req.params.id);

    if (!feed_back) {
      return res.status(404).json({
        message: "Phản hồi không tồn tại",
      });
    }

    if (!feed_back.user.equals(req.user._id)) {
      return res.status(404).json({
        message: "Bạn không có quyền xóa phản hồi",
      });
    }

    await Feedback.findByIdAndDelete(req.params.id, req.body, {
      new: true,
    });

    await Comment.updateMany(
      { feed_back: feed_back._id },
      { $pull: { feed_back: feed_back._id } }
    );

    return res.status(200).json({
      message: "Xóa phản hồi thành công",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const feed_back = await Feedback.findById(req.params.id);

    if (!feed_back.user.equals(req.user._id)) {
      return res.status(404).json({
        message: "Bạn không có quyền cập nhật phản hồi",
      });
    }

    const feedBack = await Feedback.findById(req.params.id);
    if (!feedBack) {
      return res.status(404).json({
        message: "Phản hồi không tồn tại",
      });
    }

    const data = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "Cập nhật phản hồi thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};