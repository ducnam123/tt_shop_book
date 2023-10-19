import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="grid grid-cols-4 max-w-7xl gap-10 m-auto">
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src="../public/logo.png" alt="" />
        </div>

        <div>
          <p className="my-5 text-start">
            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ
            trợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ
            Thống Fahasa trên toàn quốc.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5">
          <AiFillFacebook className="text-[30px]" />
          <AiOutlineTwitter className="text-[30px]" />
          <AiFillYoutube className="text-[30px]" />
          <AiFillInstagram className="text-[30px]" />
        </div>
      </div>

      <div>
        <ul className="flex flex-col gap-4 items-start place-items-start">
          <li className="font-bold ">DỊCH VỤ</li>
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật thông tin cá nhân</li>
          <li>Chính sách bảo mật thanh toán</li>
          <li>Giới thiệu Fahasa</li>
          <li>Hệ thống trung tâm - nhà sách</li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-4 items-start place-items-start">
          <li className="font-bold ">DỊCH VỤ</li>
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật thông tin cá nhân</li>
          <li>Chính sách bảo mật thanh toán</li>
          <li>Giới thiệu Fahasa</li>
          <li>Hệ thống trung tâm - nhà sách</li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-col gap-4 items-start place-items-start">
          <li className="font-bold ">DỊCH VỤ</li>
          <li>Điều khoản sử dụng</li>
          <li>Chính sách bảo mật thông tin cá nhân</li>
          <li>Chính sách bảo mật thanh toán</li>
          <li>Giới thiệu Fahasa</li>
          <li>Hệ thống trung tâm - nhà sách</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
