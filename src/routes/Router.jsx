import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout";
import Home from "../home/Home";
import AllProducts from "../pages/all-products/AllProducts";
import About from "../pages/about/About";
import Contact from "../pages/contoct/Contact";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/login/Login";
import Register from "../pages/Auth/register/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import DashboardLayout from "../layouts/dashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyProduct from "../pages/dashboard/MyProduct";
import SendProduct from "../pages/SendProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: 'send-product',
        element: <SendProduct></SendProduct>,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-products",
        element: <MyProduct />,
      },
    ],
  },
]);
