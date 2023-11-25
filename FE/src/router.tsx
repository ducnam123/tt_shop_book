import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

// component
import { Card, Detail } from "./components";

// notpage
import NotPage from "./components/layout/NotPage";

// client
import Home from "./components/client/Home";

// admin
import LayoutAdmin from "./components/admin/LayoutAdmin";
import AdminProductAdd from "./pages/admin/product/AddProduct";
import Dashboard from "./pages/admin/Dashboard";

// login _ signup
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Categoryes from "./pages/admin/categories/Categoryes";
import IndexProduct from "./pages/admin/product/Index";
import EditCategory from "./pages/admin/categories/Edit";
import User from "./pages/admin/user/User";
import DetailUser from "./pages/admin/user/DetailUser";
import EditBook from "./pages/admin/product/EditProduct";
import ForgetPassword from "./pages/auth/ForgetPassword";
import DetailUserHome from "./pages/auth/DetailUserHome";
import FaqPage from "./components/faq/Faq";
import NoPermission from "./pages/auth/NoPermission";
import Cart from "./pages/admin/cart/Cart";
import Foreigncategory from "./pages/client/Foreigncategory";
import Order from "./pages/admin/order/Order";
import SearchBook from "./pages/client/SearchBook";
import ClientUser from "./components/ClientUser";
import Favorite from "./pages/client/Favorite ";

import ForgotAuth from "./pages/auth/Forgotauth";

// check quyền
const PrivateRoute = () => {
  const getUser = localStorage.getItem("Auth");
  const user = JSON.parse(getUser!);
  const role = user?.role;

  return role === "admin" ? <Outlet /> : <Navigate to="/notAdmin" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Card /> },
      { path: "/books", element: <Card /> },
      { path: "/detail/:id", element: <Detail /> },
      { path: "faq", element: <FaqPage /> },
      { path: "cart", element: <Cart /> },
      { path: "foreigncategory/:name/:id", element: <Foreigncategory /> },
      { path: "books/search", element: <SearchBook /> },
      // đăng nhập đăng ký
      {
        path: "/user",
        children: [
          { path: "login", element: <SignIn /> },
          { path: "Signup", element: <SignUp /> },
          { path: "forget-password/:id", element: <ForgetPassword /> },
          { path: "forget", element: <ForgotAuth /> },
        ],
      },
      {
        path: "/detailuser",
        element: <ClientUser />,
        children: [
          { path: "detail/:id", element: <DetailUserHome /> },
          { path: "favorite", element: <Favorite /> },
        ],
      },
    ],
  },

  { path: "notAdmin", element: <NoPermission /> },

  // admin
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          { path: "dashboard", element: <Dashboard /> },

          // categories
          { path: "category", element: <Categoryes /> },
          { path: "category/edit/:id", element: <EditCategory /> },

          // product
          { path: "product", element: <IndexProduct /> },
          { path: "product/add", element: <AdminProductAdd /> },
          { path: "product/edit/:id", element: <EditBook /> },

          // user
          { path: "user", element: <User /> },
          { path: "user/edit/:id", element: <DetailUser /> },

          // order
          { path: "order", element: <Order /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotPage /> },
]);
