import { useState } from "react";
import {
  AiFillProfile,
  AiOutlineBell,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  // user
  const getUser = localStorage.getItem("Auth");
  const user = JSON.parse(getUser!);
  const nameUser = user?.name;
  const img = user?.avatar[0].url;
  const role = user?.role;
  const id = user?._id || user?.user?.id;
  // Đăng xuất tài khoản
  const logout = () => {
    localStorage.removeItem("Auth");
    return navigate("/");
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      {/* banner */}
      <div className="bg-[#eb97dd]">
        <div className="max-w-7xl mx-auto">
          <img src="../../../public/banner.jpg" alt="" className="" />
        </div>
      </div>

      {/* header */}
      <div className=" font-sans leading-normal tracking-normal bg-white">
        <nav id="header" className=" w-full max-w-7xl m-auto">
          {/* <!--Nav--> */}
          <div className=" w-full border-b border-grey-light">
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
                  onClick={() => setIsHovered(!isHovered)}
                />

                <div
                  className={`absolute ${
                    isHovered ? "block" : "hidden"
                  } bg-red-500 w-[240px]`}
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
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                    <button
                      className="flex flex-col text-grey-dark no-underline hover:text-black hover:underline py-2 px-2 items-center text-[15px] font-bold"
                      onClick={() => setMenuVisible(!menuVisible)}
                    >
                      {nameUser ? (
                        <div className=" relative">
                          <img
                            src={img}
                            alt=""
                            className="rounded-full w-auto max-w-[40px] h-[40px] mx-auto"
                          />
                          <h1>{nameUser}</h1>
                          <div
                            className={`-right-16 mt-5 absolute w-[150px] shadow-2xl rounded-2xl  ${
                              menuVisible ? "block" : "hidden"
                            }`}
                          >
                            <div className="rounded-2xl hover:bg-blue-500 py-2 text-center">
                              <a href={`/user/detail/${id}`}>
                                Chi tiết tài khoản
                              </a>
                            </div>
                            {role === "admin" ? (
                              <div className="rounded-2xl hover:bg-blue-500 py-2 text-center">
                                <a href="admin/dashboard">Trang admin</a>
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="rounded-2xl hover:bg-blue-500 py-2 text-center">
                              <h1 onClick={logout}>Đăng xuất</h1>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <AiOutlineUser className="text-[20px] mx-auto" />
                          <a href="/user/login">Tài khoản</a>
                        </div>
                      )}
                    </button>
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
