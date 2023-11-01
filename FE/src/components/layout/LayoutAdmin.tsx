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

// ? lấy thông tin tài khoản user
// import saveUser from "./SaveUser";

// đăng xuất tài khoản
import { useDispatch } from "react-redux";
import { logout } from "../../store/authActions";
import setLoggedOut from "../../store/authSlice";
// tài khoản - user
import { useSelector } from "react-redux";

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

// chính - main
const LayoutAdmin = React.memo(() => {
  const navigate = useNavigate();

  // đăng xuất tài khoản
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Gọi action đăng xuất
    dispatch(logout());
    navigate("/");
  };

  // ? lấy thông tin tài khoản đã lưu ra
  const auth = useSelector((state: any) => {
    // Get the dynamic key (action name) from the state
    const dynamicKey = Object.keys(state.auth.mutations)[0];
    const authData = state.auth.mutations[dynamicKey];

    // Access the data you need
    const accessToken = authData.data.accessToken;
    const user = authData.data.user;

    return {
      accessToken,
      user,
    };
  });

  // menu
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    } else {
      navigate("/");
    }
  };

  //
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // menu
  const items: MenuItem[] = [
    getItem(`Tài khoản: ${auth?.user.name}`, "sub2", <AiOutlineUser />, [
      getItem("Đăng xuất", "logout"),
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
});

export default LayoutAdmin;
