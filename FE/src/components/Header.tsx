import React, { useState } from "react";
import {
  AiFillProfile,
  AiOutlineBell,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMenuMouseEnter = () => {
    // Không làm gì khi di chuột vào menu
  };

  const handleMenuMouseLeave = () => {
    setIsHovered(false); // Ẩn menu khi di chuột ra khỏi menu
  };

  return (
    <div>
      {/* banner */}
      <div className="w-full bg-[#d032d383]">
        <div className="max-w-7xl m-auto">
          <img src="../../../public/banner.jpg" alt="" className="" />
        </div>
      </div>

      {/* header */}
      <div className="bg-gray-100 font-sans leading-normal tracking-normal bg-gray-200">
        <nav id="header" className=" w-full max-w-7xl m-auto">
          {/* <!--Nav--> */}
          <div className=" w-full   border-b border-grey-light">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
              <div className="pl-4 flex items-center">
                <a href="/">
                  <img
                    src="../../public/logo.png"
                    alt=""
                    className="w-[200px]"
                  />
                </a>

                {/* menu */}
                <AiFillProfile
                  className="cursor-pointer text-[30px] ml-8 relative hover:block"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />

                <div
                  className={`absolute ${isHovered ? "block" : "hidden"}`}
                  onMouseEnter={handleMenuMouseEnter}
                  onMouseLeave={handleMenuMouseLeave}
                >
                  <ul>
                    <li>menu</li>
                    <li>menu</li>
                    <li>menu</li>
                    <li>menu</li>
                  </ul>
                </div>

                {/* //! search */}
                <div
                  id="search-toggle"
                  className="search-icon cursor-pointer pl-6 ml-10"
                >
                  <form action="" className="relative mx-auto w-max">
                    <input
                      type="search"
                      className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </form>
                </div>
              </div>

              <div className="pr-4">
                <button
                  id="nav-toggle"
                  className="block lg:hidden flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-black hover:border-purple appearance-none focus:outline-none"
                >
                  <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                  </svg>
                </button>
              </div>

              <div
                className="w-full flex-grow lg:flex lg:flex-1 lg:content-center lg:justify-end lg:w-auto hidden  mt-2 lg:mt-0 z-20"
                id="nav-content"
              >
                <ul className="list-reset lg:flex justify-end items-center">
                  <li className="mr-3 py-2 lg:py-0">
                    <a
                      className="flex flex-col  py-2 px-2 text-black font-bold no-underline items-center text-[15px]"
                      href="#"
                    >
                      <AiOutlineBell className="text-[20px]" />
                      Thông báo
                    </a>
                  </li>
                  <li className="mr-3 py-2 lg:py-0">
                    <a
                      className="flex flex-col text-grey-dark no-underline hover:text-black hover:underline py-2 px-2 items-center text-[15px] font-bold"
                      href="#"
                    >
                      <AiOutlineShoppingCart className="text-[20px]" />
                      Giỏ hàng
                    </a>
                  </li>
                  <li className="mr-3 py-2 lg:py-0">
                    <a
                      className="flex flex-col text-grey-dark no-underline hover:text-black hover:underline py-2 px-2 items-center text-[15px] font-bold"
                      href="/user/login"
                    >
                      <AiOutlineUser className="text-[20px]" />
                      Tài khoản
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
