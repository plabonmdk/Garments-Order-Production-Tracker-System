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
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";

import ManageUsers from "../dashboardLayout/ManageUsers/MannageUsers";
import AllOrders from "../dashboardLayout/AllOrder/AllOrder";
import AddProduct from "../dashboardLayout/AddProduct/AddProduct";
import ManageProducts from "../dashboardLayout/ManageProducts/ManageProducts";
import PendingOrders from "../dashboardLayout/PendingOrder/PendingOrders";
import ApprovedOrders from "../dashboardLayout/ApprovedOrders/ApprovedOrders";
import MyOrders from "../dashboardLayout/MyOrders/MyOrders";
import TrackOrder from "../dashboardLayout/TrackOrder/TrackOrder";
import MyProfile from "../dashboardLayout/MyProfile/Myprofile";
import AdminAllProducts from "../dashboardLayout/AdminAllProducts/AdminAllProducts";

import ProductDetails from "../pages/ProductDetails/ProductDetails";
import OrderForm from "../pages/OrderForm/OrderForm";
import Payment from "../dashboardLayout/Payment/Payment";
import PaymentCancelled from "../dashboardLayout/Payment/paymentCancelled";
import PaymentSuccess from "../dashboardLayout/Payment/PaymentSuccess";

export const router = createBrowserRouter([
  /* ================= PUBLIC ================= */
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "all-products", element: <AllProducts /> },

      //  FIXED PRODUCT DETAILS ROUTE (DYNAMIC)
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "order/:id",
        element: (
          <PrivateRoute>
            <OrderForm />
          </PrivateRoute>
        ),
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  /* ================= AUTH ================= */
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },

  /* ================= DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      /* -------- ADMIN -------- */
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AdminAllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        ),
      },

      /* -------- MANAGER -------- */
      {
        path: "add-product",
        element: (
          <ManagerRoute>
            <AddProduct />
          </ManagerRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <ManagerRoute>
            <ManageProducts />
          </ManagerRoute>
        ),
      },
      {
        path: "pending-orders",
        element: (
          <ManagerRoute>
            <PendingOrders />
          </ManagerRoute>
        ),
      },
      {
        path: "approved-orders",
        element: (
          <ManagerRoute>
            <ApprovedOrders />
          </ManagerRoute>
        ),
      },

      /* -------- BUYER -------- */
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "payment",
        element: <Payment></Payment>
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>
      },
      {
        path: 'payment-success',
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "track-order/:orderId",
        element: <TrackOrder />,
      },

      /* -------- COMMON -------- */
      {
        path: "profile",
        element: <MyProfile />,
      },
    ],
  },

  /* ================= 404 ================= */
  {
    path: "*",
    element: <h2 className="text-center mt-20">404 | Page Not Found</h2>,
  },
]);
