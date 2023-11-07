import { Link } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

import Container from "../Container";
import FooterLink from "./FooterLink";

import "./Footer.css";

const Footer = () => {
  const link1 = [
    { name: "Tra thông tin bảo hành", url: "/" },
    { name: "Tra thông tin đơn hàng", url: "/" },
    { name: "Tra cứu hoá đơn điện tử", url: "/" },
    { name: "Mua hàng trả góp Online", url: "/" },
    { name: "Mua hàng và thanh toán Online", url: "/" },
  ];

  const link2 = [
    { name: "FAQ", url: "/faq" },
    { name: "Chính sách Bảo hành", url: "/" },
    { name: "Dịch vụ bảo hành mở rộng", url: "/" },
    { name: "Dịch vụ bảo hành điện thoại", url: "/" },
    { name: "Khách hàng doanh nghiệp (B2B)", url: "/" },
  ];

  const link3 = [
    { name: "Gọi mua: 1800.1060 (7:30 - 22:00)", url: "/" },
    { name: "Khiếu nại: 1800.1062 (8:00 - 21:30)", url: "/" },
    { name: "Bảo hành: 1800.1064 (8:00 - 21:00)", url: "/" },
  ];

  return (
    <>
      <footer className="w-full bg-slate-200 mt-10">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-10 sm:px-8 px-5 py-16">
            <FooterLink title="Thông tin và chính sách" links={link1} />

            <FooterLink title="Hỗ trợ" links={link2} />

            <FooterLink title="Liên hệ" links={link3} />
          </div>

          <div className="flex flex-col justify-between pt-5 pb-10 border-t border-gray-800 sm:flex-row">
            <span className="text-sm text-gray-500">
              © Copyright 2023 <i className="hover:text-rose-500">shopBook</i>.
              All rights reserved
            </span>

            <div className="flex items-center mt-4 space-x-4 sm:mt-0 gap-4">
              <Link to="/">
                <FcGoogle size={25} />
              </Link>

              <Link to="/" className="text-[#1877F2]">
                <BsFacebook size={25} />
              </Link>

              <Link to="/" className="text-[#1d9bf0]">
                <AiOutlineTwitter size={25} />
              </Link>

              <Link to="/" className="instagram text-white">
                <AiOutlineInstagram size={25} />
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
