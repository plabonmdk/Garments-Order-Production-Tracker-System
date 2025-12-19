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
import Payment from "../dashboardLayout/Payment/Payment";
import PaymentSuccess from "../dashboardLayout/Payment/PaymentSuccess";
import PaymentCancelled from "../dashboardLayout/Payment/paymentCancelled";
import PaymentHistory from "../dashboardLayout/PaymentHistory/PaymentHistory";
import Delivery from "../pages/dalyvari/Delivery";


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
        path: 'delivery',
        element: <PrivateRoute><Delivery></Delivery></PrivateRoute>,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())

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
      {
        path: 'payment/:productId',
        Component: Payment
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: 'payment-cancelled',
       element: <PaymentCancelled></PaymentCancelled>
      },
      {
        path: 'payment-history',
        element: <PaymentHistory></PaymentHistory>
      }
    ],
  },
]);
