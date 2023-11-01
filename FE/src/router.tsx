import { createBrowserRouter } from "react-router-dom";

// component
import { Card, Detail } from "./components";

// notpage
import NotPage from "./components/NotPage";

// client
import Home from "./components/layout/Home";

// admin
import LayoutAdmin from "./components/layout/LayoutAdmin";
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

// đăng nhập

// const PrivateRoute = (saveUser: any) => {
//   const userRole: any = saveUser["saveUser"]["user"]["role"] && "admin";
//   console.log(userRole);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (userRole === "admin") {
//       navigate("/admin/dashboard");
//     }
//   }, [saveUser]);

//   return userRole === "admin" ? <Outlet /> : <Navigate to="/user/login" />;
// };

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path: "/", element: <Card /> },
      { path: "/detail/:id", element: <Detail /> },
      { path: "/user/login", element: <SignIn /> },
      { path: "/user/Signup", element: <SignUp /> },
      { path: "/user/forget", element: <ForgetPassword /> },
    ],
  },

  {
    path: "/admin",
    // element: <PrivateRoute isAuth={users} />,
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
        ],
      },
    ],
  },

  { path: "*", element: <NotPage /> },
]);
