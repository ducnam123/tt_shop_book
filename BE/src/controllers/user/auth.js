import User from "../../models/user/auth";
import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../../schemas/auth";
import jwt from "jsonwebtoken";
import { sendMailRegister } from '../../config/emailService'

export const signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    // Kiểm tra xem user đã đk chưa?
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // gửi email thông báo
    sendMailRegister(user.name, user.email)

    // Tạo token
    const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });

    // không trả về password
    user.password = undefined;

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    // Kiểm tra xem user đã đk chưa?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
      });
    }

    // So sánh mật khẩu

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mật khẩu không đúng",
      });
    }

    const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1d" });

    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.find()
    if (user.length === 0) {
      res.status(200).json(
        {
          message: "không có dữ liệu"
        })
    }
    return res.json(user)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id })
    return res.status(200).json({
      message: "Xóa thành công",
      user
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const editUser = async (req, res) => {
  try {

    // kiểm tra xem người dùng đã cug cấp mật khẩu hay chưa
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      req.body.password = hashedPassword
    }

    const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })

    return res.status(200).json({
      user
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    return res.status(200).json({
      user
    })
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}