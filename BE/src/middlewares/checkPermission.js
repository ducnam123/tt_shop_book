import jwt from "jsonwebtoken";
import User from "../models/auth";

export const checkPermission = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Bạn chưa đăng nhập",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "123456", async (error, decoded) => {
    if (error && error.name === "JsonWebTokenError") {
      return res.json({
        message: "Token không hợp lệ",
      });
    }

    console.log(decoded)

    if (!decoded || !decoded.id) {
      return res.json({
        message: "Token không hợp lệ"
      })
    }

    const user = await User.findById(decoded.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền truy cập tài nguyên này",
      });
    }

    req.user = user;
    next();
  });
};