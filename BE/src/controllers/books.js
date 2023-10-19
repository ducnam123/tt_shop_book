import Book from "../models/books";
import joi from "joi";
import Category from "../models/category";

const bookSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  categoryId: joi.string().required(),
});

export const getAll = async (req, res) => {
  const { _limit = 10, _sort = "createAt", _order = "asc", _page = 1 } = req.query;

  const options = {
    limit: _limit,
    page: _page,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  try {
    const data = await Book.paginate({}, options);
    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const data = await Book.findById(req.params.id).populate("categoryId");

    if (data.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = bookSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const book = await Book.create(req.body);

    // Thêm ObjectId vào thuộc tính products trong model Category
    await Category.findByIdAndUpdate(book.categoryId, {
      $addToSet: {
        products: book._id,
      },
    });
    if (book.length === 0) {
      return res.status(200).json({
        message: "Không thêm được sản phẩm",
      });
    }
    return res.json(book);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const data = await Book.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (data.length === 0) {
      return res.status(200).json({
        message: "Cập nhật sản phẩm không thành công",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const data = await Book.findOneAndDelete({ _id: req.params.id });
    return res.json({
      message: "Xóa sản phẩm thành công",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};