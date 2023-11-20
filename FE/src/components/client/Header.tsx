import { useState } from "react";
import {
  AiFillProfile,
  AiOutlineBell,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/categories";
import { useSelector } from "react-redux";
import { Input } from "antd";

const Header = () => {
  const { Search } = Input;

  const navigate = useNavigate();

  const onSearch = async (value: string) => {
    const url = `/books/search?q=${value}`;
    navigate(url);
  };

  const cartItems = useSelector((state: any) => state?.cart.cartItems);
  const { data } = useGetCategoriesQuery();
  const getUser = localStorage.getItem("Auth");
  const user = JSON.parse(getUser!);
  const { name: nameUser, role, _id } = user ? user : "";
  const idUser = _id ? _id : user?.id;
  const img = user?.avatar[0]?.url;

  const [menuVisible, setMenuVisible] = useState(false);

  // đăng xuất
  const logout = () => {
    const itemsToRemove = ["Auth", "Token"];
    itemsToRemove.forEach((item) => {
      localStorage.removeItem(item);
    });
    navigate("/");
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
                <div className="relative">
                  <div className="flex justify-center text-center">
                    <AiFillProfile
                      className="cursor-pointer text-[30px] ml-8 hover:block mt-2"
                      onClick={() => setIsHovered(!isHovered)}
                    />
                    <h1 className="mt-2">Danh mục</h1>
                  </div>

                  <div
                    className={`absolute z-50 translate-x-[-70px] top-16 ${
                      isHovered ? "block" : "hidden"
                    } bg-white w-[140px] ml-10 rounded-md mt-4`}
                  >
                    <ul className="flex flex-col gap-4 my-3 ml-2 ">
                      {data
                        ? data.map((category: any) => {
                            const name = category.name;
                            const slug = name
                              .toLowerCase()
                              .replace(
                                /à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,
                                "a"
                              )
                              .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
                              .replace(/ì|í|ị|ỉ|ĩ/g, "i")
                              .replace(
                                /ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,
                                "o"
                              )
                              .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
                              .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
                              .replace(/đ/g, "d")
                              .replace(/[*+~.()'"!:@]/g, "")
                              .replace(/\s+/g, "-");

                            return (
                              <a
                                href={`/foreigncategory/${slug}/${category._id}`}
                                key={category._id}
                                className="hover:shadow-2xl hover:shadow max-w-[120px] hover:rounded-md hover:px-2 hover:py-2"
                              >
                                <li>{category.name}</li>
                              </a>
                            );
                          })
                        : ""}
                    </ul>
                  </div>
                </div>

                {/* //! search */}
                <div className="ml-20 mt-2 w-[400px]">
                  <Search
                    placeholder="Mời nhập sản phẩm cần tìm"
                    onSearch={(value) => onSearch(value)}
                  />
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
                    <div className="relative">
                      <a
                        className="flex flex-col text-grey-dark no-underline hover:text-black hover:underline py-2 px-2 items-center text-[15px] font-bold"
                        href="/cart"
                      >
                        <AiOutlineShoppingCart className="text-[20px]" />
                        Giỏ hàng
                      </a>

                      {cartItems.length <= 0 ? (
                        ""
                      ) : (
                        <h1 className="absolute top-0 right-0 bg-blue-500 w-6 text-center rounded-full text-[white]">
                          {cartItems.length}
                        </h1>
                      )}
                    </div>
                  </li>
                  <li className="mr-3 py-2 lg:py-0">
                    <button
                      className="flex flex-col text-grey-dark no-underline hover:text-black hover:underline py-2 px-2 items-center text-[15px] font-bold"
                      onClick={() => setMenuVisible(!menuVisible)}
                    >
                      {nameUser ? (
                        <div className=" relative">
                          {img !== null ? (
                            <img
                              src={img}
                              alt=""
                              className="rounded-full w-auto max-w-[40px] h-[40px] mx-auto"
                            />
                          ) : (
                            <AiOutlineUser className="text-[20px] mx-auto" />
                          )}

                          <h1>{nameUser}</h1>
                          <div
                            className={`-right-16 mt-5 absolute w-[150px] shadow-2xl rounded-2xl bg-white translate-x-[-50px] ${
                              menuVisible ? "block" : "hidden"
                            }`}
                          >
                            <div className="rounded-2xl hover:bg-blue-500 py-2 text-center">
                              <a href={`/detailuser/detail/${idUser}`}>
                                Chi tiết tài khoản
                              </a>
                            </div>
                            {role === "admin" ? (
                              <div className="rounded-2xl hover:bg-blue-500 py-2 text-center">
                                <a href="/admin/dashboard">Trang admin</a>
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
