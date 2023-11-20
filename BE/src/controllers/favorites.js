import UserModel from "../models/auth";
import BookModel from "../models/books";

export const favorite = async (req, res) => {
  const productId = req.params.id;

  try {
    const isFavorite = req.user.favorites.some(
      (favorite) => favorite.toString() === productId
    );

    if (isFavorite) {
      await UserModel.updateMany(
        { _id: req.user._id },
        { $pull: { favorites: productId } }
      );

      return res.status(200).json({
        message: "Hủy yêu thích thành công",
      });
    }

    await UserModel.updateMany(
      { _id: req.user._id },
      { $addToSet: { favorites: productId } }
    );

    return res.status(200).json({
      message: "Yêu thích thành công",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Lỗi server: " + error.message,
    });
  }
};

export const getFavoriteByUser = async (req, res) => {
  try {
    const favorites = req.user.favorites;

    const listProducts = await Promise.all(
      favorites.map((id) => BookModel.findById(id))
    );

    return res.status(200).json({
      message: "Danh sách sản phẩm yêu thích",
      listProducts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};