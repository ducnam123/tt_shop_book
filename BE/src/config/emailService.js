import nodemailer from "nodemailer";
import dotenv from "dotenv";

import { emailOauthRegister, emailRegister } from "../views";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "nghichtest226@gmail.com",
    pass: "iciu eoev xinm jhcb",
  },
});

export const sendMailRegister = async (name, email) => {
  await transporter.sendMail({
    from: "nghichtest226@gmail.com",
    to: email,
    subject: "Đăng ký tài khoản thành công",
    text: `Chào bạn, ${name}`,
    html: emailRegister(name),
  });
};

export const sendMailOauthRegister = async (name, email, password) => {
  await transporter.sendMail({
    from: "ducnamnguyen03@gmail.com",
    to: email,
    subject: "Đăng ký tài khoản thành công",
    text: `Chào bạn, ${name}`,
    html: "hi",
  });
};