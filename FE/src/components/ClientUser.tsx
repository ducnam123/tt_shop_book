import React, { useState } from "react";
import { AiFillAmazonCircle } from "react-icons/ai";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import { Link, NavLink, Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App = () => {
  const getUser = localStorage.getItem("Auth");
  const user = JSON.parse(getUser!);
  const idUser = user?._id ? user?._id : user?.id;
  const items: MenuItem[] = [
    getItem(
      <NavLink to={`detail/${idUser}`}>Thông tin tài khoản</NavLink>,
      "1",
      <AiFillAmazonCircle />
    ),
    getItem(
      <NavLink to="favorite">Sản phẩm yêu thích</NavLink>,
      "2",
      <AiFillAmazonCircle />
    ),
    getItem(
      <Link to="https://ant.design" target="_blank" rel="noopener noreferrer">
        Quản lí đơn hàng
      </Link>,
      "link",
      <AiFillAmazonCircle />
    ),
  ];

  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <div className="flex mt-4 gap-5 max-w-7xl">
      <div className="flex h-screen">
        <Divider type="vertical" />

        <br />
        <br />
        <Menu
          className="pt-5"
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode={mode}
          theme={theme}
          items={items}
        />
      </div>

      <div className="w-[1000px]">
        <Switch onChange={changeTheme} /> Change Style
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default App;
