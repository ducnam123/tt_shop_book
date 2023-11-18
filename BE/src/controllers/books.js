import Book from "../models/books";
import Category from "../models/category";
import { bookSchema } from "../schemas/books";


export const getAll = async (req, res) => {
  const { _limit = 8, _sort = "createAt", _order = "asc", _page = 1 } = req.query;

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
        books: book._id,
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
    const bookId = req.params.id
    const category = await Category.findOne({ books: bookId });
    if (category) {
      // Nếu tìm thấy danh mục, cập nhật nó để xóa _id của sản phẩm
      category.books = category.books.filter((book) => book.toString() !== bookId);
      await category.save(); // Lưu cập nhật
    }


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

// tìm kiếm
export const searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const data = await Book.find({
      $or: [
        { author: { $regex: new RegExp(query, 'i') } },
        { name: { $regex: new RegExp(query, 'i') } },
      ],
    });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
