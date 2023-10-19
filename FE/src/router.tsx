import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";

// component
import { Card, Detail, Footer } from "./components";

// notpage
import NotPage from "./components/NotPage";

// client
import Home from "./components/layout/Home";

// admin
import LayoutAdmin from "./components/layout/LayoutAdmin";
import AdminProductAdd from "./pages/admin/product/add";
import Dashboard from "./pages/admin/Dashboard";

// login _ signup
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Categoryes from "./pages/admin/categories/Categoryes";
import IndexProduct from "./pages/admin/product";
import EditCategory from "./pages/admin/categories/Edit";
import User from "./pages/admin/user/User";

// đăng nhập
const userData: any = localStorage.getItem("userData");
const users = JSON.parse(userData);

const PrivateRoute = (saveUser: any) => {
  const userRole: any = saveUser["saveUser"]["user"]["role"] && "admin";
  console.log(userRole);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [saveUser]);

  return userRole === "admin" ? <Outlet /> : <Navigate to="/user/login" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Card /> },
      { path: "/detail/:id", element: <Detail /> },
      { path: "/user/login", element: <SignIn /> },
      { path: "/user/Signup", element: <SignUp /> },
    ],
  },

  {
    path: "/admin",
    element: <PrivateRoute saveUser={users} />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "product", element: <IndexProduct /> },

          // categories
          { path: "category", element: <Categoryes /> },
          { path: "category/edit/:_id", element: <EditCategory /> },

          // user
          { path: "user", element: <User /> },
        ],
      },
    ],
  },

  { path: "*", element: <NotPage /> },
]);
