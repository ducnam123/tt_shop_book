import User from "../models/auth";
import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../schemas/auth";
import jwt from "jsonwebtoken";
import { sendMailRegister } from '../config/emailService'
import { sendMail, sendRestPassword } from "../middlewares/sendMail";
import { generateRandomCode } from "../config/function";
import { v4 as uuidv4 } from "uuid";

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


// ! // ! =======================================================
export const verify = async (req, res) => {
  const { randomCode, randomString } = req.body;

  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const email = decoded.email;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "Không tìm thấy người dùng",
      });
    }

    if (user.isVerifyEmail) {
      return res.status(400).json({
        message: "Email đã được kích hoạt",
      });
    }

    if (
      randomCode !== decoded.randomCode ||
      randomString !== decoded.randomString
    ) {
      return res.status(500).json({
        message: "Mã xác minh không chính xác",
      });
    }

    user.isVerifyEmail = true;
    await user.save();

    return res.status(200).json({
      message: "Xác minh email thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

// Đổi mật khẩu
export const getSecurityCode = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email không tồn tại",
    });
  }

  let randomCode = generateRandomCode();
  let randomString = uuidv4();

  const token = jwt.sign(
    { email: email, randomCode: randomCode, randomString: randomString },
    process.env.SECRET_KEY,
    { expiresIn: "10m" }
  );

  const resetPasswordUrl = `${process.env.APP_URL}/user/forget-password/${randomString}`;
  sendMail(user.name, user.email, randomCode, resetPasswordUrl);

  return res.status(200).json({
    message: "Gửi mã thành công",
    accessCode: token,
  });
};

export const resetPassword = async (req, res) => {
  const { password, randomString, randomCode } = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY,);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    if (
      randomString !== decoded.randomString ||
      randomCode !== decoded.randomCode
    ) {
      return res.status(400).json({
        message: "Mã bảo mật không chính xác!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "Không được giống mật khẩu cũ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userNew = await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.error(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đổi mật khẩu",
    });
  }
};

// gửi mã bão mật
export const getCode = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Email không tồn tại",
    });
  }

  let randomCode = generateRandomCode();

  sendRestPassword(user.name, user.email, randomCode);

  const code = jwt.sign(
    { email: user.email, code: randomCode },
    process.env.SECRET_KEY,
    {
      expiresIn: "3m",
    }
  );

  return res.status(200).json({
    message: "Gửi mã thành công",
    code,
  });
};

export const checkCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "Kiểm tra thất bại",
      });
    }

    const codeCheck = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(codeCheck, "123456");

    if (code !== decoded.code) {
      return res.status(400).json({
        message: "Mã bảo mật không chính xác!",
      });
    }

    return res.status(200).json({
      message: "Mã bảo mật chính xác",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

// đổi mật khẩu
export const changePassword = async (req, res) => {
  const { oldPassword, password, confirmPassword } = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Hai mật khẩu không khớp!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Mật khẩu phải có độ dài từ 6 ký tự trở lên",
      });
    }

    const checkPass = await bcrypt.compare(oldPassword, user.password);
    if (!checkPass) {
      return res.status(400).json({
        message: "Mật khẩu cũ không chính xác",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(400).json({
        message: "Không được giống mật khẩu cũ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userNew = await User.findOneAndUpdate(
      { email: decoded.email },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.error(err);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    }

    return res.status(500).json({
      message: "Đã có lỗi xảy ra khi đổi mật khẩu",
    });
  }
};

