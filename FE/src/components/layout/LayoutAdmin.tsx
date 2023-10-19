import React, { useState } from "react";
import {
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
  AiOutlineUser,
  AiOutlineVideoCamera,
  AiOutlineBarChart,
  AiOutlineTrademarkCircle,
  AiFillDollarCircle,
} from "react-icons/ai";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const LayoutAdmin = () => {
  const navigate = useNavigate();

  // menu
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "5") {
      console.log("đã thoát");
      localStorage.removeItem("userData");
      navigate("/");
    } else {
      navigate("/");
    }
  };

  //
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // chuyển thông tin tài khoản sang javascript -> và lưu thông tin
  const userData: any = localStorage.getItem("userData");
  // const user = JSON.parse(userData);
  // const userName: any = user["user"]["role"];
  const userName = "hihi";
  // menu
  const items: MenuItem[] = [
    getItem(`Tài khoản: ${userName}`, "sub2", <AiOutlineUser />, [
      getItem("Đăng xuất", "5"),
      getItem("Trang chủ", "6"),
    ]),
  ];
  // ------------------------------------------------------
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiOutlineBarChart />,
              label: <Link to="/admin/dashboard">Thống kê</Link>,
            },
            {
              key: "2",
              icon: <AiOutlineTrademarkCircle />,
              label: <Link to="/admin/category">Danh mục</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineVideoCamera />,
              label: <Link to="/admin/product">Sản phẩm</Link>,
            },

            {
              key: "4",
              icon: <AiOutlineUser />,
              label: <Link to="/admin/user">Người dùng</Link>,
            },
            {
              key: "5",
              icon: <AiFillDollarCircle />,
              label: <Link to="/admin/order">Đơn hàng</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div className="mr-10 mt-2">
            <Menu
              onClick={onClick}
              style={{ width: 290 }}
              mode="vertical"
              items={items}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
