import Category from "../models/category";
import { categoriSchema } from '../schemas/category'

export const getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(200).json({
        message: "Không có danh mục nào",
      });
    }
    return res.json(categories);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("books");
    if (category.length === 0) {
      return res.status(200).json({
        message: "Không có dữ liệu",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = categoriSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const category = await Category.create(req.body);
    if (category.length === 0) {
      return res.status(200).json({
        message: "Không thêm được danh mục",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = categoriSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    if (category.length === 0) {
      return res.status(200).json({
        message: "Cập nhật danh mục không thành công",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const cate = await Category.findOneAndDelete({ _id: req.params.id });
    return res.json({
      message: "Xóa danh mục thành công",
      cate,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

export const caterogy = async (req, res) => {
  try {
    const { categoryName } = req.query;

    if (!categoryName) {
      return res.status(400).json({
        message: "Vui lòng cung cấp tên danh mục."
      });
    }

    const lowerCaseCategoryName = categoryName.toLowerCase();
    const category = await Category.findOne({ name: lowerCaseCategoryName });

    if (!category) {
      return res.status(404).json({
        message: "không tìm thấy danh mục cần tìm"
      })
    }

    const booksInCategory = await Book.find({ _id: { $in: category.books } });
    return res.json({
      message: "Danh mục và sản phẩm tìm kiếm là:",
      category,
      booksInCategory
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
